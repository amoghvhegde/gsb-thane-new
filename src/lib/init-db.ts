import pool from './db';

export async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    // Create blog_posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        author VARCHAR(100) NOT NULL,
        content_html TEXT NOT NULL,
        image_url VARCHAR(500),
        image_hint VARCHAR(255),
        video_url VARCHAR(500),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create seva_bookings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS seva_bookings (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        selected_pooja_ids INTEGER[],
        pan_number VARCHAR(10),
        donation_amount DECIMAL(10,2) DEFAULT 0,
        total_pooja_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create membership_applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS membership_applications (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        middle_name VARCHAR(100),
        surname VARCHAR(100) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        postal_address TEXT NOT NULL,
        pin_code VARCHAR(6) NOT NULL,
        mobile_no VARCHAR(10) NOT NULL,
        email VARCHAR(255) NOT NULL,
        date_of_birth VARCHAR(20) NOT NULL,
        occupation VARCHAR(100) NOT NULL,
        qualification VARCHAR(100) NOT NULL,
        marital_status VARCHAR(20) NOT NULL,
        num_children INTEGER,
        gotra VARCHAR(100) NOT NULL,
        kuladevata VARCHAR(100) NOT NULL,
        math VARCHAR(50) NOT NULL,
        native_place VARCHAR(100) NOT NULL,
        other_gsb_institutions TEXT,
        membership_type VARCHAR(20) NOT NULL,
        introducer_name VARCHAR(100),
        declaration BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully');
    
    // Insert sample blog posts if table is empty
    const result = await client.query('SELECT COUNT(*) FROM blog_posts');
    if (parseInt(result.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO blog_posts (title, date, author, content_html, image_url, image_hint, video_url) VALUES
        ($1, $2, $3, $4, $5, $6, $7),
        ($8, $9, $10, $11, null, null, $12),
        ($13, $14, $15, $16, $17, $18, null)
      `, [
        'GSB Mandal Thane - Annual General Meeting 2023',
        'October 28, 2023',
        'GSB Mandal Thane',
        '<p>The Annual General Meeting (AGM) of GSB Mandal Thane was held on <strong>Sunday, 22nd October 2023</strong>. We thank all members for their active participation and valuable suggestions.</p><p>Key discussions included a review of the past year\'s activities, financial reporting, and planning for upcoming events. The committee expressed gratitude for the community\'s continued support.</p><p>Further details and minutes of the meeting will be shared with members via email shortly.</p>',
        'https://placehold.co/600x400.png',
        'meeting community',
        null,
        'Successful Ganesh Chaturthi Celebrations 2023',
        'September 30, 2023',
        'GSB Mandal Thane',
        '<p>We are delighted to share the success of our Ganesh Chaturthi celebrations for 2023. The event saw enthusiastic participation from the community, with various cultural programs and traditional rituals.</p><p>The Mandal extends its heartfelt thanks to all volunteers, donors, and attendees who made this event a grand success. Your contributions and support are invaluable.</p><p>Here\'s a glimpse of the festivities:</p>',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Upcoming Kojagiri Pournima Event',
        'September 15, 2023',
        'GSB Mandal Thane',
        '<p>GSB Mandal Thane invites all members and their families to celebrate Kojagiri Pournima with us. Join us for an evening of devotion, music, and community bonding.</p><p><strong>Date:</strong> To be announced</p><p><strong>Venue:</strong> Mandal Hall, Thane</p><p>More details regarding the program schedule and contributions will be shared soon. We look forward to your presence.</p>',
        'https://placehold.co/600x400.png',
        'festival celebration'
      ]);
      console.log('Sample blog posts inserted');
    }
    
  } finally {
    client.release();
  }
}

export async function testConnection() {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}