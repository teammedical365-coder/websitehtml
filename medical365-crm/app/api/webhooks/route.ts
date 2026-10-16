import { NextRequest, NextResponse } from 'next/server';
import { db, calculateLeadScore } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Map website form fields (first_name, last_name, phone_number, etc.)
    const name = [body.first_name, body.last_name].filter(Boolean).join(' ') || body.name || 'Anonymous Visitor';
    const phone = body.phone_number || body.phone || 'N/A';
    const email = body.email || '';
    const organization = body.organization_name || body.facility_name || '';
    const facilityType = body.facility_type || 'Hospital';
    const bedCount = body.bed_count || '';
    const challenges = body.challenges || body.message || '';
    const sourceUrl = body.source_page_url || body.source_url || 'https://www.medical365.in';
    const topic = body.inquiry_topic || 'Request Free Demo';

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
      requirement: `Facility: ${facilityType}${bedCount ? ` • ${bedCount}` : ''} • Inquiry: ${topic}`,
      department: 'Hospital Administration & IT',
      status: 'New Inquiry',
      source: 'Website',
      assignedTo: 'Nurse Sneha (Triage Coordinator)',
      value: bedCount.includes('500+') ? 350000 : bedCount.includes('51-200') ? 180000 : 75000,
      insuranceType: 'Cashless TPA',
      score,
      priority: score >= 75 ? 'High' : score >= 50 ? 'Medium' : 'Low',
      city,
      notes: `Captured from Medical365 Website (${sourceUrl})\nOrganization: ${organization || 'N/A'}\nChallenges / Message: ${challenges || 'None provided'}`,
      nextAction: 'Call lead within 15 minutes to schedule demonstration'
    });

    return NextResponse.json({
      success: true,
      message: 'Lead successfully captured and triaged.',
      lead_id: newLead.id,
      score: newLead.score
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook ingestion error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
