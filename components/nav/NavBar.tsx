"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import LoginButton from "../ui/LoginLogoutButton";
import { Profile } from "./Profile";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";

export default function Navbar() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const [users, setUsers] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsers(user);
      setUser(users);
    };
    fetchUser();
  }, []);
  if (users) {
    localStorage.setItem("id", users?.id);
  }
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-10 fixed left-0 top-0 bg-white z-10">
      <Link href={"/"} className="font-bold text-2xl">
        DailyMedia
      </Link>
      {user?.id ? <Profile /> : <LoginButton />}
    </nav>
  );
}
