'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push('/'), 2000);
  }, []);
  return <div>You have logged out... redirecting in a sec.</div>;
};

export default LogoutPage;
