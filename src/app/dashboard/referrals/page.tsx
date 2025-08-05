"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getReferredUsers, type ReferredUser } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Users, AlertTriangle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase'; // Adjust path as needed
import { doc, getDoc } from 'firebase/firestore';

export default function MyReferralsPage() {
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [userName, setUserName] = useState<{ firstName: string; lastName: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const [currentUserMobile, setCurrentUserMobile] = useState<string | null>(null);

  useEffect(() => {
    const mobile = typeof window !== 'undefined' ? localStorage.getItem('registeredMobile') : null;
    if (mobile && mobile !== "N/A") {
      setCurrentUserMobile(mobile);
    } else {
      setError("User not identified. Please log in again.");
      setIsLoading(false);
    }
  }, [router]);

  // Fetch referral code and user name from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUserMobile) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUserMobile));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setReferralCode(userData.generatedReferralCode || null);
          
          // Set user name (adjust field names based on your Firebase structure)
          setUserName({
            firstName: userData.firstName || userData.first_name || '',
            lastName: userData.lastName || userData.last_name || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUserMobile) {
      fetchUserData();
    }
  }, [currentUserMobile]);

  useEffect(() => {
    if (currentUserMobile) {
      const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        const result = await getReferredUsers(currentUserMobile);
        if (result.success && result.users) {
          setReferredUsers(result.users);
        } else {
          setError(result.error || "Failed to load referred users.");
        }
        setIsLoading(false);
      };
      fetchUsers();
    }
  }, [currentUserMobile]);

  const copyToClipboard = async () => {
    if (referralCode) {
      try {
        await navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getWelcomeMessage = () => {
    if (!userName) return 'Welcome!';
    const fullName = `${userName.firstName} ${userName.lastName}`.trim();
    return fullName ? `Welcome ${fullName}!` : 'Welcome!';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading your referrals...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Welcome and Referral Code Card - Updated to match Referred Users styling */}
      <Card className="max-w-4xl mx-auto shadow-xl bg-muted">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{getWelcomeMessage()}</CardTitle>
          <CardDescription className="text-lg">
            Share your referral code with friends and earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg border">
            <p className="text-sm font-medium mb-2">Your referral code is:</p>
            <div className="flex items-center gap-3">
              <code className="text-2xl font-bold bg-muted px-4 py-2 rounded-md flex-1 text-center border">
                {referralCode || 'Buy a course to generate a referral code'}
              </code>
              {referralCode && (
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referred Users Card */}
      <Card className="max-w-4xl mx-auto shadow-xl bg-muted">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">My Referred Users</CardTitle>
          </div>
          <CardDescription>
            Here is a list of users you have successfully referred to SowSuccess.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="my-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {!error && referredUsers.length === 0 && (
            <div className="text-center py-10">
              <Users className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-xl text-muted-foreground">You haven't referred anyone yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Share your referral code to start earning!</p>
            </div>
          )}

          {!error && referredUsers.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead className="text-right">Referred Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referredUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell className="text-right">{formatDate(user.referredAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="mt-8 text-center">
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
