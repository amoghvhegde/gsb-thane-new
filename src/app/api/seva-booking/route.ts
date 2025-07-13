import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { z } from 'zod';

const SevaBookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  selectedPoojaIds: z.array(z.number()),
  panNumber: z.string().optional().refine(val => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
    message: "Invalid PAN number format",
  }),
  donationAmount: z.number().nonnegative("Donation amount must be non-negative").optional(),
  totalPoojaPrice: z.number().nonnegative(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = SevaBookingSchema.parse(body);
    
    const client = await pool.connect();
    
    try {
      const result = await client.query(`
        INSERT INTO seva_bookings (
          first_name, last_name, email, phone, address, 
          selected_pooja_ids, pan_number, donation_amount, total_pooja_price
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `, [
        validatedData.firstName,
        validatedData.lastName,
        validatedData.email,
        validatedData.phone,
        validatedData.address,
        validatedData.selectedPoojaIds,
        validatedData.panNumber,
        validatedData.donationAmount || 0,
        validatedData.totalPoojaPrice
      ]);
      
      return NextResponse.json({ 
        success: true, 
        message: "Seva booking submitted successfully.",
        data: result.rows[0] 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error submitting seva booking:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during submission." },
      { status: 500 }
    );
  }
}