import { NextRequest, NextResponse } from 'next/server';
import { db, calculateLeadScore } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.eventType || body.type || 'whatsapp';
    const sourcePage = body.sourcePage || body.sourceUrl || body.source_page_url || '/';
    const phone = body.phone || body.phone_number || '+91 77919 10007';
    const name = body.name || (eventType === 'whatsapp' ? 'WhatsApp Inquirer' : 'Inbound Phone Caller');
    const message = body.message || `Visitor initiated ${eventType} inquiry from ${sourcePage}`;
    const organization = body.organization || body.organization_name || 'Website Visitor';
    
    // Infer city from source page
    let city = body.city || 'Jaipur';
    if (!body.city && sourcePage) {
      const match = sourcePage.match(/-([a-z]+)\.html/i);
      if (match && match[1]) {
        city = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      }
    }

    const score = calculateLeadScore({
      phone,
      inquiry_topic: `${eventType.toUpperCase()} Inquiry`,
      notes: message
    });

    const isWhatsApp = eventType.toLowerCase().includes('whatsapp');

    const newLead = db.leads.create({
      name: organization && organization !== 'Website Visitor' ? `${name} (${organization})` : name,
      phone,
      email: body.email || '',
      gender: 'Other',
      requirement: isWhatsApp 
        ? `WhatsApp Live Clinical Inquiry (${city})`
        : `Phone Call Inbound Inquiry (${city})`,
      department: 'Hospital Administration & IT',
      status: 'New Inquiry',
      source: isWhatsApp ? 'WhatsApp' : 'Website',
      assignedTo: 'Nurse Sneha (Triage Coordinator)',
      value: 75000,
      insuranceType: 'Cashless TPA',
      score: isWhatsApp ? Math.max(score, 80) : score,
      priority: 'High',
      city,
      notes: `Captured via ${eventType} event on Medical 365 Website\nPage: ${sourcePage}\nMessage: ${message}`,
      nextAction: isWhatsApp 
        ? 'Reply back via WhatsApp coordinator within 5 minutes'
        : 'Call back within 15 minutes'
    });

    return NextResponse.json({
      success: true,
      message: 'Telemetry lead tracked and received in CRM.',
      lead_id: newLead.id,
      source: newLead.source,
      data: newLead
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Telemetry tracking error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
