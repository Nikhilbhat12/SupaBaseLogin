"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import LoginButton from "../ui/LoginLogoutButton";
import { Profile } from "./Profile";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";
import { Separator } from "../ui/separator";
import DropDown from "../DropDown";
import { Button } from "../ui/button";
import { login } from "@/lib/auth-action";
import { signout } from "@/lib/auth-action";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const router = useRouter();

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

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-10 fixed left-0 top-0 bg-white">
      <Link href={"/"} className="font-bold text-2xl">
        DailyMedia
      </Link>
      <span className="absolute right-0 pr-5 md:hidden sm:block">
        <DropDown />
      </span>

      <section className="mb-5">
        <div className="flex h-5 items-center space-x-4 text-sm mt-5">
          <Link href="" className="hidden md:block">
            For You
          </Link>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link href="" className="hidden md:block">
            Docs
          </Link>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link href="" className="hidden md:block">
            Software development
          </Link>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link href="" className="hidden md:block">
            Mental Health
          </Link>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link href="" className="hidden md:block">
            Enterpreneurship
          </Link>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link href="" className="hidden md:block">
            web development
          </Link>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link href="" className="hidden md:block">
            Software Engineering
          </Link>
        </div>
      </section>

      {user?.id ? (
        <Button
          onClick={() => {
            signout();
            setUser(undefined);
          }}
          className="hidden md:block"
        >
          Log out
        </Button>
      ) : (
        <Button onClick={navigateToLogin} className="hidden md:block">
          Log in
        </Button>
      )}
    </nav>
  );
}
