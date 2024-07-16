"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import LoginButton from "./ui/LoginLogoutButton";
import { Profile } from "../components/nav/Profile";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";
import { Separator } from "../components/ui/separator";
import { Button } from "./ui/button";
import { login } from "@/lib/auth-action";
import { signout } from "@/lib/auth-action";
import { useRouter } from "next/navigation";
// import LogoutPage from "@/app/(auth)/logout/page";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import LoginButton from "./ui/LoginLogoutButton";
// import { Profile } from "./nav/Profile";

export default function DropDown() {
  const [position, setPosition] = React.useState("bottom");
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const [users, setUsers] = useState<any>(null);
  const supabase = createClient();

  const router = useRouter();
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
    <div>
      <DropdownMenu>
        {/* Dropdown Trigger */}
        <DropdownMenuTrigger className="border border-gray rounded-md  cursor-pointer p-2 bg-black text-white">
          <svg
            width="25"
            height="25"
            viewBox="0 0 15 15"
            fillRule="evenodd"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="border border-gray-300 rounded-md mt-1 shadow-lg ">
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            For You
          </DropdownMenuItem>
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            Docs
          </DropdownMenuItem>
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            Software Development
          </DropdownMenuItem>
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            Mental Health
          </DropdownMenuItem>
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            Enterprenurship
          </DropdownMenuItem>
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            Web development
          </DropdownMenuItem>
          <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
            Software Enginnering
          </DropdownMenuItem>
          <DropdownMenuSeparator className="hidden sm:block" />

          {user?.id ? (
            <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
              <Button
                onClick={() => {
                  signout();
                  setUser(undefined);
                }}
                className="w-full"
              >
                Log out
              </Button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className=" px-4 py-2 text-gray-800 hover:bg-gray-200">
              <Button onClick={navigateToLogin} className="w-full">
                Log in
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
