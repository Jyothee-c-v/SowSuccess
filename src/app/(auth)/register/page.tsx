// app/register/page.tsx
'use client';

import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RegisterForm />
    </div>
  );
}
