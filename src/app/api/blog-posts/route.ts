import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDatabase();
    
    const rows = await db.all(`
      SELECT id, title, date, author, content_html, image_url, image_hint, video_url
      FROM blog_posts 
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({ success: true, data: rows });
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
    
    const db = await getDatabase();
    
    const result = await db.run(`
      INSERT INTO blog_posts (title, date, author, content_html, image_url, image_hint, video_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [title, date, author, content_html, image_url, image_hint, video_url]);
    
    const newPost = await db.get('SELECT * FROM blog_posts WHERE id = ?', [result.lastID]);
    
    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}