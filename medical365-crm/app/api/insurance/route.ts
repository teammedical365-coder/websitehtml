import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const claims = db.insurance.findMany();
    return NextResponse.json({ success: true, count: claims.length, data: claims });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch insurance claims';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.patientName || !body.tpaName || !body.policyNumber) {
      return NextResponse.json(
        { success: false, error: 'Patient name, TPA provider, and policy number are required.' },
        { status: 400 }
      );
    }

    const estimatedCost = Number(body.estimatedCost) || 150000;
    const coPayPercentage = Number(body.coPayPercentage) || 0;
    const deductibles = Number(body.deductibles) || 0;
    const approvedAmount = Number(body.approvedAmount) || 0;
    const patientShare = Number(body.patientShare) || (estimatedCost * (coPayPercentage / 100) + deductibles);

    const newClaim = db.insurance.create({
      patientId: body.patientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: body.patientName,
      patientPhone: body.patientPhone || '',
      tpaName: body.tpaName,
      policyNumber: body.policyNumber,
      policyHolderName: body.policyHolderName || body.patientName,
      relationWithPatient: body.relationWithPatient || 'Self',
      hospitalizationType: body.hospitalizationType || 'Planned Surgery',
      procedureName: body.procedureName || 'Surgical Treatment',
      department: body.department || 'General Surgery',
      admissionDate: body.admissionDate || new Date().toISOString().split('T')[0],
      expectedDischargeDate: body.expectedDischargeDate || new Date().toISOString().split('T')[0],
      estimatedCost,
      approvedAmount,
      coPayPercentage,
      deductibles,
      patientShare,
      status: body.status || 'Documents Collected',
      queryDetails: body.queryDetails || ''
    });

    return NextResponse.json({ success: true, data: newClaim }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to register insurance claim';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Claim ID is required.' }, { status: 400 });
    }

    const updated = db.insurance.update(body.id, body, body.timelineNote);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Claim not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update claim';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
