import { ReactNode } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
}
