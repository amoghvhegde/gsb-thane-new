import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { z } from 'zod';

const MembershipApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  gender: z.enum(["Male", "Female"]),
  postalAddress: z.string().min(1, "Postal address is required"),
  pinCode: z.string().length(6, "Pin code must be 6 digits").regex(/^\d{6}$/),
  mobileNo: z.string().length(10, "Mobile number must be 10 digits").regex(/^\d{10}$/),
  email: z.string().email(),
  dateOfBirth: z.string(),
  occupation: z.string().min(1, "Occupation is required"),
  qualification: z.string().min(1, "Qualification is required"),
  maritalStatus: z.enum(["Married", "Unmarried"]),
  numChildren: z.number().int().nonnegative().optional(),
  gotra: z.string().min(1, "Gotra is required"),
  kuladevata: z.string().min(1, "Kuladevata is required"),
  math: z.enum(["Kashi", "Gokarn", "Kavale"]),
  nativePlace: z.string().min(1, "Native place is required"),
  otherGSBInstitutions: z.string().optional(),
  membershipType: z.enum(["Life", "Patron"]),
  introducerName: z.string().optional(),
  declaration: z.boolean().refine(val => val === true),
}).refine(data => data.maritalStatus === "Unmarried" || (data.maritalStatus === "Married" && data.numChildren !== undefined), {
  message: "Number of children is required if married",
  path: ["numChildren"],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = MembershipApplicationSchema.parse(body);
    
    const client = await pool.connect();
    
    try {
      const result = await client.query(`
        INSERT INTO membership_applications (
          first_name, middle_name, surname, gender, postal_address, pin_code,
          mobile_no, email, date_of_birth, occupation, qualification, marital_status,
          num_children, gotra, kuladevata, math, native_place, other_gsb_institutions,
          membership_type, introducer_name, declaration
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING *
      `, [
        validatedData.firstName,
        validatedData.middleName,
        validatedData.surname,
        validatedData.gender,
        validatedData.postalAddress,
        validatedData.pinCode,
        validatedData.mobileNo,
        validatedData.email,
        validatedData.dateOfBirth,
        validatedData.occupation,
        validatedData.qualification,
        validatedData.maritalStatus,
        validatedData.numChildren,
        validatedData.gotra,
        validatedData.kuladevata,
        validatedData.math,
        validatedData.nativePlace,
        validatedData.otherGSBInstitutions,
        validatedData.membershipType,
        validatedData.introducerName,
        validatedData.declaration
      ]);
      
      return NextResponse.json({ 
        success: true, 
        message: "Membership application submitted successfully.",
        data: result.rows[0] 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error submitting membership application:', error);
    
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