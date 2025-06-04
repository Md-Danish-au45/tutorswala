import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import ContactWidget from '../widgets/contact-widget';
import logo from '../../public/images/logo/logo.png';
import bringmarkLogo from '../../public/images/logo/logo.png'; // Adjust path to your logo

const Footer = () => {
  return (
    <div>
      <footer className="w-full border-t bg-background py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">Tutorswala.com</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting students with expert tutors for academic success.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#tutors" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Our Tutors
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Study Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Parent Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                &copy; {new Date().getFullYear()} Tutorswala.com. All rights reserved
              </div>
              <div className="hidden sm:block">|</div>
              <div className="flex items-center gap-2">
              Developed by <a href="https://bringmark.com" target="_blank" rel="noopener" className="text-emerald-600 hover:underline">Bringmark</a>
                <a href="https://bringmark.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <Image 
                    src={bringmarkLogo}
                    alt="Bringmark Logo" 
                    width={90}  // Adjust to your logo's aspect ratio
                    height={90}
                    className="h-5 w-auto rounded-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ContactWidget />
    </div>
  );
};

export default Footer;