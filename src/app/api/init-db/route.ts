import { NextResponse } from 'next/server';
import { initializeDatabase, testConnection } from '@/lib/init-db';

export async function GET() {
  try {
    // Test connection first
    const connectionSuccessful = await testConnection();
    if (!connectionSuccessful) {
      return NextResponse.json(
        { success: false, message: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Initialize database tables
    await initializeDatabase();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to initialize database', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(); // Allow both GET and POST for convenience
}