import BlogPostItem from '@/components/BlogPostItem';
import RightSidebar from '@/components/layout/RightSidebar';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  content_html: string;
  image_url?: string;
  image_hint?: string;
  video_url?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
    const response = await fetch(`${baseUrl}/api/blog-posts`, {
      cache: 'no-store' // Ensure fresh data on each request
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.statusText);
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow lg:w-[calc(100%-20rem-2rem)] xl:w-[calc(100%-24rem-2rem)]"> {/* Main content area for blog posts */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostItem
              key={post.id}
              title={post.title}
              date={post.date}
              author={post.author}
              contentHtml={post.content_html}
              imageUrl={post.image_url}
              imageHint={post.image_hint}
              videoUrl={post.video_url}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No blog posts available. Database may not be initialized.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Visit <a href="/api/init-db" className="text-accent hover:underline">/api/init-db</a> to initialize the database.
            </p>
          </div>
        )}
      </div>
      <aside className="lg:w-80 xl:w-96 flex-shrink-0"> {/* Sidebar area */}
        <RightSidebar />
      </aside>
    </div>
  );
}