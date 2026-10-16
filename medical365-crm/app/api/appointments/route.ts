import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const appointments = db.appointments.findMany();
    return NextResponse.json({ success: true, data: appointments });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch appointments';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.patientName || !body.doctorName || !body.date || !body.timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Patient name, doctor, date, and time slot are required.' },
        { status: 400 }
      );
    }

    const appts = db.appointments.findMany();
    const tokenNumber = appts.filter(a => a.date === body.date).length + 1;

    const newAppt = db.appointments.create({
      patientId: body.patientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: body.patientName,
      patientPhone: body.patientPhone || '',
      doctorName: body.doctorName,
      department: body.department || 'General Medicine',
      date: body.date,
      timeSlot: body.timeSlot,
      type: body.type || 'In-Person OPD',
      tokenNumber,
      status: body.status || 'Waiting',
      fee: body.fee ? Number(body.fee) : 800,
      roomNo: body.roomNo || 'OPD-101',
      notes: body.notes || ''
    });

    return NextResponse.json({ success: true, data: newAppt }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create appointment';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Appointment ID required' }, { status: 400 });
    }

    const updated = db.appointments.update(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update appointment';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
