
import { ReactNode } from 'react';
// import { DashboardHeader } from '@/components/dashboard/dashboard-header'; // DashboardHeader is no longer used

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader /> DashboardHeader is removed, main Navbar handles user info */}
      <main className="flex-1 container mx-auto py-8">
        {children}
      </main>
    </div>
  );
}
