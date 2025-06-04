import { ReactNode } from 'react';

export default function LoginAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-background via-primary/10 to-accent/10 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
