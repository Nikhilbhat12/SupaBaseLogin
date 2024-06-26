'use client';

import React, { useEffect } from 'react';

import { createBrowserClient } from '@supabase/ssr';
import { useUser } from '@/lib/store/user';

// import { Database } from '@/lib/types/supabase';

export default function SessisonProvider() {
  const setUser = useUser((state) => state.setUser);

  // const supabase = createBrowserClient<Database>(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  useEffect(() => {
    readSession();
    // eslint-disable-next-line
  }, []);

  const readSession = async () => {
    // const { data: userSesssion } = await supabase.auth.getSession();
    const { data } = await supabase.auth.getSession();
    setUser(data?.session?.user);
    // if (userSesssion.session) {
    //   const { data } = await supabase
    //     .from('users')
    //     .select('*')
    //     .eq('id', userSesssion.session?.user.id)
    //     .single();
    //   setUser(data);
    // }
  };

  return <></>;
}
