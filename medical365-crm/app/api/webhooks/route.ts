import { NextRequest, NextResponse } from 'next/server';
import { db, calculateLeadScore } from '@/lib/db';
import { LeadSource } from '@/data/mockLeads';

// Verification handler for Meta WhatsApp Cloud API webhooks
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify webhook subscription from Meta WhatsApp Cloud API
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'medical365_wa_token';
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge || 'OK', { status: 200 });
  }

  return NextResponse.json({ status: 'active', message: 'Medical 365 Webhook Service' });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Check for Meta WhatsApp Cloud API incoming message format
    let isWhatsApp = false;
    let name = '';
    let phone = '';
    let challenges = '';
    let sourceUrl = 'https://www.medical365.in';
    let topic = 'Request Free Demo';
    let organization = '';
    let facilityType = 'Hospital';
    let bedCount = '';
    let email = '';
    let explicitSource: LeadSource = 'Website';

    if (body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      // Incoming Meta WhatsApp Cloud API payload
      isWhatsApp = true;
      const changeVal = body.entry[0].changes[0].value;
      const waMsg = changeVal.messages[0];
      const waContact = changeVal.contacts?.[0];

      name = waContact?.profile?.name || 'WhatsApp Patient';
      phone = waMsg.from ? (waMsg.from.startsWith('+') ? waMsg.from : `+${waMsg.from}`) : 'WhatsApp User';
      challenges = waMsg.text?.body || (waMsg.type ? `[WhatsApp ${waMsg.type} message]` : 'Incoming WhatsApp chat');
      topic = 'WhatsApp Direct Inquiry';
      explicitSource = 'WhatsApp';
    } else {
      // Standard website form or telemetry webhook payload
      if (body.source === 'WhatsApp' || body.eventType === 'whatsapp' || body.type === 'whatsapp') {
        isWhatsApp = true;
        explicitSource = 'WhatsApp';
      } else if (body.source) {
        explicitSource = body.source as LeadSource;
      }

      name = [body.first_name, body.last_name].filter(Boolean).join(' ') || body.name || (isWhatsApp ? 'WhatsApp Inquirer' : 'Anonymous Visitor');
      phone = body.phone_number || body.phone || 'N/A';
      email = body.email || '';
      organization = body.organization_name || body.facility_name || (isWhatsApp ? 'WhatsApp Direct Visitor' : '');
      facilityType = body.facility_type || 'Hospital';
      bedCount = body.bed_count || '';
      challenges = body.challenges || body.message || (isWhatsApp ? 'Visitor initiated WhatsApp inquiry' : '');
      sourceUrl = body.source_page_url || body.source_url || 'https://www.medical365.in';
      topic = body.inquiry_topic || (isWhatsApp ? 'WhatsApp Live Demo Inquiry' : 'Request Free Demo');
    }

    // Infer city from source URL or payload
    let city = 'Jaipur';
    if (body.city) {
      city = body.city;
    } else if (sourceUrl) {
      const match = sourceUrl.match(/-([a-z]+)\.html/i);
      if (match && match[1]) {
        city = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      }
    }

    // Automated Scoring
    const score = calculateLeadScore({
      phone,
      email,
      facility_type: facilityType,
      bed_count: bedCount,
      inquiry_topic: topic,
      notes: challenges
    });

    const newLead = db.leads.create({
      name: organization ? `${name} (${organization})` : name,
      phone,
      email,
      gender: 'Other',
      requirement: isWhatsApp 
        ? `WhatsApp Inquiry: ${topic} (${city})`
        : `Facility: ${facilityType}${bedCount ? ` • ${bedCount}` : ''} • Inquiry: ${topic}`,
      department: 'Hospital Administration & IT',
      status: 'New Inquiry',
      source: explicitSource,
      assignedTo: 'Nurse Sneha (Triage Coordinator)',
      value: bedCount.includes('500+') ? 350000 : bedCount.includes('51-200') ? 180000 : 75000,
      insuranceType: 'Cashless TPA',
      score: isWhatsApp ? Math.max(score, 80) : score,
      priority: (score >= 75 || isWhatsApp) ? 'High' : score >= 50 ? 'Medium' : 'Low',
      city,
      notes: `Captured via ${explicitSource} (${sourceUrl})\nOrganization: ${organization || 'N/A'}\nInquiry Message: ${challenges || 'None provided'}`,
      nextAction: isWhatsApp 
        ? 'Reply back on WhatsApp within 5 minutes with hospital demo slot'
        : 'Call lead within 15 minutes to schedule demonstration'
    });

    return NextResponse.json({
      success: true,
      message: `Lead successfully captured via ${explicitSource} and triaged.`,
      lead_id: newLead.id,
      source: newLead.source,
      score: newLead.score
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook ingestion error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
