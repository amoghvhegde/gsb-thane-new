import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Twitter, Facebook, CalendarDays, UserCircle } from 'lucide-react';

interface BlogPostItemProps {
  title: string;
  date: string;
  author: string;
  contentHtml: string; // HTML string for content
  imageUrl?: string;
  imageHint?: string;
  videoUrl?: string; // For embedded videos
}

export default function BlogPostItem({ title, date, author, contentHtml, imageUrl, imageHint, videoUrl }: BlogPostItemProps) {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-primary hover:text-accent">
          <Link href="#">{title}</Link>
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground flex items-center space-x-4 pt-2">
          <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> {date}</span>
          <span className="flex items-center"><UserCircle className="h-4 w-4 mr-1" /> By {author}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-4 relative w-full" style={{paddingBottom: '56.25%' /* 16:9 Aspect Ratio */}}>
            <Image 
              src={imageUrl} 
              alt={title} 
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              data-ai-hint={imageHint || "blog post image"}
            />
          </div>
        )}
        {videoUrl && (
          <div className="mb-4 aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
        )}
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground border-t pt-4">
        <div className="flex items-center space-x-1">
          <MessageCircle className="h-4 w-4" />
          <Link href="#" className="hover:underline">0 Comments</Link>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
            <Mail className="h-3 w-3 mr-1" /> Email This
          </Button>
          <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
            <Twitter className="h-3 w-3 mr-1" /> Share to Twitter
          </Button>
          <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
            <Facebook className="h-3 w-3 mr-1" /> Share to Facebook
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
