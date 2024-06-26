'use client';

import React, { useEffect, useState } from 'react';

import { Button } from './button';
import { createClient } from '@/utils/supabase/client';
import { signout } from '@/lib/auth-action';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/store/user';

const LoginButton = () => {
  const setUser = useUser((state) => state.setUser);

  const [users, setUsers] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsers(user);
    };
    fetchUser();
  }, []);
  if (users) {
    return (
      <Button
        onClick={() => {
          signout();
          setUsers(null);
          setUser(undefined);
        }}
      >
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant='outline'
      onClick={() => {
        router.push('/login');
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
