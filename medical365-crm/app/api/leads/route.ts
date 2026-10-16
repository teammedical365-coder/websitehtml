import { NextRequest, NextResponse } from 'next/server';
import { db, calculateLeadScore } from '@/lib/db';
import { Lead } from '@/data/mockLeads';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const department = searchParams.get('department') || undefined;

    const leads = db.leads.findMany({ search, status, department });
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch leads';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Patient name and phone number are required.' },
        { status: 400 }
      );
    }

    // Automated score if not provided
    const score = body.score || calculateLeadScore({
      phone: body.phone,
      email: body.email,
      facility_type: body.facility_type,
      bed_count: body.bed_count,
      value: body.value,
      insuranceType: body.insuranceType,
      notes: body.notes
    });

    const newLead = db.leads.create({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      age: body.age ? Number(body.age) : undefined,
      gender: body.gender || 'Other',
      requirement: body.requirement || 'General Clinical Consultation',
      department: body.department || 'General & Laparoscopic Surgery',
      status: body.status || 'New Inquiry',
      source: body.source || 'Website',
      assignedTo: body.assignedTo || 'Nurse Sneha (Triage Coordinator)',
      value: body.value ? Number(body.value) : 25000,
      insuranceType: body.insuranceType || 'Self Pay / Cash',
      score,
      priority: score >= 75 ? 'High' : score >= 50 ? 'Medium' : 'Low',
      city: body.city || 'Jaipur',
      notes: body.notes || '',
      nextAction: body.nextAction || 'Schedule Initial OPD Consultation'
    });

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create lead';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required.' }, { status: 400 });
    }

    const updated = db.leads.update(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update lead';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
