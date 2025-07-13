import { getDatabase } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

async function createBlogPost(formData: FormData) {
  'use server';
  
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const author = formData.get('author') as string;
  const content_html = formData.get('content_html') as string;
  const image_url = formData.get('image_url') as string;
  const image_hint = formData.get('image_hint') as string;
  const video_url = formData.get('video_url') as string;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/api/blog-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        author: author || 'GSB Mandal Thane',
        content_html,
        image_url: image_url || null,
        image_hint: image_hint || null,
        video_url: video_url || null,
      }),
    });

    if (response.ok) {
      // Redirect to home page to see the new post
      return { success: true };
    } else {
      return { success: false, error: 'Failed to create post' };
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error: 'Failed to create post' };
  }
}

export default function AddPostPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Add New Blog Post</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Blog Post</CardTitle>
          <CardDescription>Fill in the details to create a new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createBlogPost} className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title" 
                name="title" 
                required 
                placeholder="Enter blog post title"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  name="date" 
                  placeholder="e.g., January 15, 2024"
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">Leave empty for current date</p>
              </div>
              
              <div>
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  name="author" 
                  placeholder="GSB Mandal Thane"
                  defaultValue="GSB Mandal Thane"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="content_html">Content (HTML) *</Label>
              <Textarea 
                id="content_html" 
                name="content_html" 
                required
                rows={8}
                placeholder="Enter the blog post content in HTML format. 
Example:
<p>This is a paragraph.</p>
<p><strong>Bold text</strong> and <em>italic text</em>.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>"
                className="mt-1 font-mono text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input 
                id="image_url" 
                name="image_url" 
                type="url"
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="image_hint">Image Hint/Alt Text</Label>
              <Input 
                id="image_hint" 
                name="image_hint" 
                placeholder="Description of the image"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="video_url">Video URL (YouTube Embed)</Label>
              <Input 
                id="video_url" 
                name="video_url" 
                type="url"
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create Blog Post
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                <a href="/" className="w-full">Cancel</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline" asChild>
              <a href="/">← Back to Home</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/admin">View Admin Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}