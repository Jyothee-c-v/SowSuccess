
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getReferredUsers, type ReferredUser } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MyReferralsPage() {
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [currentUserMobile, setCurrentUserMobile] = useState<string | null>(null);

  useEffect(() => {
    const mobile = typeof window !== 'undefined' ? localStorage.getItem('registeredMobile') : null;
    if (mobile && mobile !== "N/A") {
      setCurrentUserMobile(mobile);
    } else {
      setError("User not identified. Please log in again.");
      setIsLoading(false);
      // Optionally redirect to login after a delay
      // setTimeout(() => router.push('/login'), 3000);
    }
  }, [router]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading your referrals...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
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
