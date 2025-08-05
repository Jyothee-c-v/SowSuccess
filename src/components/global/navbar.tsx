"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, Users as ReferralsIcon } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Import your Firebase functions
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust path to your Firebase config

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#training-programs", label: "Programs" },
  { href: "/#faq", label: "FAQs" },
  { href: "/dashboard", label: "Dashboard", protected: true },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = pathname.startsWith('/dashboard');

  const [userDetails, setUserDetails] = useState({ 
    firstName: "", 
    lastName: "", 
    displayName: "Member",
    mobile: "" 
  });
  const [isClient, setIsClient] = useState(false);

  // Function to fetch user data from Firebase
  const fetchUserData = async (mobile) => {
    try {
      // Assuming you store user data with mobile as document ID
      // Adjust the collection name and document structure as needed
      const userDoc = await getDoc(doc(db, 'users', mobile));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          mobile: mobile
        };
      } else {
        // If document doesn't exist, try to find by mobile field
        // You might need to implement a query here if mobile is a field, not document ID
        console.log('User document not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (isAuthenticated && typeof window !== 'undefined') {
      const storedMobile = localStorage.getItem('registeredMobile');
      if (storedMobile) {
        // Fetch user data from Firebase
        fetchUserData(storedMobile).then((userData) => {
          if (userData) {
            const displayName = `${userData.firstName} ${userData.lastName}`.trim() || "Member";
            setUserDetails({
              firstName: userData.firstName,
              lastName: userData.lastName,
              displayName: displayName,
              mobile: userData.mobile
            });
          } else {
            setUserDetails(prev => ({ 
              ...prev, 
              mobile: storedMobile,
              displayName: "Member" 
            }));
          }
        });
      } else {
        setUserDetails(prev => ({ 
          ...prev, 
          mobile: "N/A",
          displayName: "Member" 
        }));
      }
    }
  }, [isAuthenticated, pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('registeredMobile');
    }
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
          {navLinks.map((link) => {
            if (link.protected && !isAuthenticated) return null;
            if (link.href === "/dashboard" && isAuthenticated) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href || (link.href.includes("#") && pathname === link.href.split("#")[0])
                    ? "text-primary"
                    : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {isClient && isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden lg:inline">
                Welcome!
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {userDetails.firstName && userDetails.lastName 
                          ? `${userDetails.firstName[0]}${userDetails.lastName[0]}`.toUpperCase()
                          : <User className="h-5 w-5" />
                        }
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userDetails.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userDetails.mobile || 'Loading...'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/referrals')}>
                    <ReferralsIcon className="mr-2 h-4 w-4" />
                    <span>My Referrals</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : isClient && !isAuthenticated ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">Join Now</Link>
              </Button>
            </>
          ) : null}
        </nav>

        <div className="md:hidden flex items-center">
          {isClient && isAuthenticated && (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-2">
                    <Avatar className="h-8 w-8">
                       <AvatarFallback>
                        {userDetails.firstName && userDetails.lastName 
                          ? `${userDetails.firstName[0]}${userDetails.lastName[0]}`.toUpperCase()
                          : <User className="h-5 w-5" />
                        }
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userDetails.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userDetails.mobile || 'Loading...'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/referrals')}>
                    <ReferralsIcon className="mr-2 h-4 w-4" />
                    <span>My Referrals</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => {
                   if (link.protected && !isAuthenticated) return null;
                   if (link.href === "/dashboard" && isAuthenticated) return null;
                  return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                  );
                })}
                 {isClient && isAuthenticated ? (
                  <>
                    <Button variant="ghost" onClick={() => router.push('/dashboard/referrals')} className="justify-start text-lg">
                      <ReferralsIcon className="mr-2 h-5 w-5" /> My Referrals
                    </Button>
                    <Button variant="outline" onClick={handleLogout} className="text-lg">
                      <LogOut className="mr-2 h-5 w-5" /> Log out
                    </Button>
                  </>
                ) : isClient && !isAuthenticated ? (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/register">Join Now</Link>
                    </Button>
                  </>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
