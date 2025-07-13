'use server';

import { z } from 'zod';

// Define the schema for seva booking data
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

export type SevaBookingData = z.infer<typeof SevaBookingSchema>;

interface SubmissionResult {
  success: boolean;
  message?: string;
  data?: SevaBookingData;
}

export async function submitSevaBooking(data: SevaBookingData): Promise<SubmissionResult> {
  try {
    // Validate the data against the schema
    const validatedData = SevaBookingSchema.parse(data);

    console.log("Seva Booking Data Received:", validatedData);

    // Call the API endpoint to save to database
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/api/seva-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || 'Failed to submit seva booking' };
    }

    return result;

  } catch (error) {
    console.error("Error submitting seva booking:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(', ') };
    }
    return { success: false, message: "An unexpected error occurred during submission." };
  }
}