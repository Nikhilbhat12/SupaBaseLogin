import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { CiLogout } from 'react-icons/ci';
import { createClient } from '@/utils/supabase/client';
import { signout } from '@/lib/auth-action';
import { useUser } from '@/lib/store/user';

export const Profile = () => {
  const setUser = useUser((state) => state.setUser);
  const supabase = createClient();
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsers(user);
    };
    fetchUser();
  }, []);

  if (users?.id) {
    return (
      <div>
        <Button
          onClick={() => {
            signout();
            setUser(undefined);
          }}
        >
          Log out
        </Button>
      </div>
    );
  }
};
