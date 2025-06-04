import Link from "next/link";
import { Logo } from "./logo";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 text-muted-foreground py-12">
      <div className="container max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="mb-4 inline-block">
            <Logo />
          </Link>
          <p className="text-sm">
            A revolutionary training + referral initiative by Vishakyaa Foundation.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/#programs" className="hover:text-primary transition-colors">Training Programs</Link></li>
            <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link href="/register" className="hover:text-primary transition-colors">Join Now</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
          <address className="not-italic text-sm space-y-2">
            <p className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
              <span>Vishakyaa Foundation – SowSuccess Initiative<br />
              688, 6th Main Rd, BEL Layout 3rd Block, Vidyaranyapura, Bengaluru – 560097</span>
            </p>
            <p className="flex items-center">
              <Phone className="w-4 h-4 mr-2 shrink-0" />
              <Link href="tel:+91 9108706236" className="hover:text-primary transition-colors">+91 9108706236</Link> / <Link href="tel:+91 9483725336" className="hover:text-primary transition-colors">+91 9483725336</Link>
            </p>
            <p className="flex items-center">
              <Mail className="w-4 h-4 mr-2 shrink-0" />
              <Link href="mailto:info@sowsuccess.in" className="hover:text-primary transition-colors">info@sowsuccess.in</Link>
            </p>
          </address>
        </div>
      </div>
      <div className="container max-w-screen-2xl mt-8 pt-8 border-t border-border text-center text-xs">
        <p>&copy; {new Date().getFullYear()} SowSuccess by Vishakyaa Foundation. All rights reserved.</p>
        <p>Website: <Link href="https://www.sowsuccess.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">www.sowsuccess.in</Link></p>
      </div>
    </footer>
  );
}
