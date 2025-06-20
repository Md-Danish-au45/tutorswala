import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logod.png"
              alt="Tutorswala Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />

            <span className="text-xl font-bold">Tutorswala.com</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#tutors"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Our Tutors
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
