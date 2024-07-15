"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import LoginButton from "../ui/LoginLogoutButton";
import { Profile } from "./Profile";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";
import { Separator } from "../ui/separator";

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
    <nav className="w-full justify-between items-center flex p-5 xl:p-10 fixed left-0 top-0 bg-white z-10 ">
      <Link href={"/"} className="font-bold text-2xl">
        DailyMedia
      </Link>
      <section className="mb-5">
        {/* <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div> */}
        {/* <Separator className="my-4" /> */}
        <div className="flex h-5 items-center space-x-4 text-sm ">
          <Link href="">For You</Link>
          <Separator orientation="vertical" />
          <Link href="">Docs</Link>
          <Separator orientation="vertical" />
          <Link href="">Software development</Link>
          <Separator orientation="vertical" />
          <Link href="">Mental Health</Link>
          <Separator orientation="vertical" />
          <Link href="">Enterpreneurship</Link>
          <Separator orientation="vertical" />
          <Link href="">web development</Link>
          <Separator orientation="vertical" />
          <Link href="">Software Engineering</Link>
        </div>
      </section>
      {user?.id ? <Profile /> : <LoginButton />}
    </nav>
  );
}




