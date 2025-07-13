import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    try {
      const result = await client.query(`
        SELECT id, title, date, author, content_html, image_url, image_hint, video_url
        FROM blog_posts 
        ORDER BY created_at DESC
      `);
      
      return NextResponse.json({ success: true, data: result.rows });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, author, content_html, image_url, image_hint, video_url } = body;
    
    const client = await pool.connect();
    
    try {
      const result = await client.query(`
        INSERT INTO blog_posts (title, date, author, content_html, image_url, image_hint, video_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [title, date, author, content_html, image_url, image_hint, video_url]);
      
      return NextResponse.json({ success: true, data: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}