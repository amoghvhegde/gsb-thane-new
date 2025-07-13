import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Environment check:');
    console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);
    
    // Extract parts manually for debugging
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      const url = new URL(dbUrl);
      console.log('Host:', url.hostname);
      console.log('Port:', url.port);
      console.log('Database:', url.pathname);
      console.log('Username:', url.username);
      console.log('Password present:', !!url.password);
    }
    
    return NextResponse.json({
      success: true,
      env_present: !!process.env.DATABASE_URL,
      env_length: process.env.DATABASE_URL?.length || 0,
      parsed: dbUrl ? {
        hostname: new URL(dbUrl).hostname,
        port: new URL(dbUrl).port,
        pathname: new URL(dbUrl).pathname
      } : null
    });
  } catch (error) {
    console.error('Test connection error:', error);
    return NextResponse.json({
      success: false,
      error: String(error)
    });
  }
}