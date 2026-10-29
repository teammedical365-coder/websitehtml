import { NextRequest, NextResponse } from 'next/server';
import { db, calculateLeadScore } from '@/lib/db';
import { LeadSource } from '@/data/mockLeads';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isWhatsApp = body.type === 'whatsapp' || body.source === 'WhatsApp';
    const explicitSource: LeadSource = isWhatsApp ? 'WhatsApp' : (body.source || 'Website');

    const name = body.name || (isWhatsApp ? 'WhatsApp Inquirer' : 'Website Inquirer');
    const phone = body.phone || body.phone_number || '+91 77919 10007';
    const email = body.email || '';
    const organization = body.organization || '';
    const facilityType = body.facilityType || 'Hospital';
    const bedCount = body.bedCount || '';
    const message = body.message || '';
    const sourcePage = body.sourcePage || body.source_page_url || '/';

    let city = body.city || 'Jaipur';
    if (!body.city && sourcePage) {
      const match = sourcePage.match(/-([a-z]+)\.html/i);
      if (match && match[1]) {
        city = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      }
    }

    const score = calculateLeadScore({
      phone,
      email,
      facility_type: facilityType,
      bed_count: bedCount,
      notes: message
    });

    const newLead = db.leads.create({
      name: organization ? `${name} (${organization})` : name,
      phone,
      email,
      gender: 'Other',
      requirement: isWhatsApp 
        ? `WhatsApp Demo Request (${city})`
        : `Facility: ${facilityType}${bedCount ? ` • ${bedCount}` : ''} • Inquiry: ${body.type || 'Demo'}`,
      department: 'Hospital Administration & IT',
      status: 'New Inquiry',
      source: explicitSource,
      assignedTo: 'Nurse Sneha (Triage Coordinator)',
      value: 75000,
      insuranceType: 'Cashless TPA',
      score: isWhatsApp ? Math.max(score, 80) : score,
      priority: (score >= 75 || isWhatsApp) ? 'High' : 'Medium',
      city,
      notes: `Recorded via ${body.type || 'form'} on Medical 365\nPage: ${sourcePage}\nMessage: ${message}`,
      nextAction: isWhatsApp 
        ? 'Connect on WhatsApp within 5 minutes'
        : 'Schedule demonstration call'
    });

    return NextResponse.json({
      success: true,
      lead_id: newLead.id,
      source: newLead.source,
      data: newLead
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lead record ingestion error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
