import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-between gap-6 md:h-24">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/images/logo/site-logo.png"
            alt="AskleMed Logo"
            width={170}
            height={42}
            priority
            className="h-auto w-[135px] md:w-[165px]"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          {/* Optional Nav Links */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>

            <Link
              href="#process"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Process
            </Link>

            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-[#3183ff] px-6 font-medium text-white shadow-sm transition-all hover:scale-[1.02] hover:!bg-blue-900 hover:shadow-md"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
