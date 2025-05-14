import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Committee Members', href: '/committee-members' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Gallery', href: '/gallery' },
];

export default function SiteHeader() {
  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center lg:text-left mb-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            <Link href="/">GSB Mandal Thane</Link>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">
            || श्री गणेशाय नमः || श्री कुलस्वामिनी प्रसन्न ||
          </p>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-border pt-4">
          <ul className="flex flex-wrap justify-center lg:justify-start space-x-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-foreground hover:text-accent transition-colors pb-1">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-end -mt-12">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg text-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
