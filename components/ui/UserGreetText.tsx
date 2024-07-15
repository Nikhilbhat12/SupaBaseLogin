"use client";

import { Card, CardContent, CardTitle } from "./card";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { getBlogs } from "@/utils/sql/sql";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";

const UserGreetText = () => {
  // const [file, setFile] = useState<File | null>(null);
  // const [description, setDescription] = useState<string>("");
  // const [title, setTitle] = useState<string>("");
  // const [editingBlog, setEditingBlog] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const setUser = useUser((state) => state.setUser);
  const [blogs, setBlogs] = useState<any[]>([]);
  const user = useUser((state) => state.user);
  const supabase = createClient();
  const router = useRouter();
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }
    const user = data?.user;
    setUserData(user);
    setUser(user);
  };

  async function getBlogsItems() {
    try {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) {
        throw error;
      }
      setBlogs(data);
      console.log("Blogs retrieved successfully:", data);
    } catch (error: any) {
      console.error("Error retrieving blogs:", error.message);
    }
  }

  

  const deleteBlog = async (id: any) => {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) {
        throw error;
      }

      console.log("Blog deleted successfully");
      getBlogsItems();
    } catch (error: any) {
      console.error("Error deleting blog:", error.message);
    }
  };




  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) {
      getBlogsItems();
    }
  }, [userData]);

  if (userData !== null) {
    
    return (
      <div>
        <p
          className="fixed left-0 top-20 w-full flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-6 
          backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit gap-5 items-center"
        >
          <code className="font-mono font-bold">
            Hello{" "}
            {(userData?.user?.user_metadata?.full_name ||
              userData?.user_metadata?.full_name) ??
              "user"}
            !
          </code>
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
            variant="outline"
          >
            Add a new Blog
            
          </Button>
        </p>
        <div className="mt-20 fixed mb-90 overflow-y-auto h-[calc(100vh-10rem)]">
          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((blog) => (
                <Card key={blog.id} className="shadow-md mb-4 mx-4 sm:mx-10 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={`https://hsuaakcahbyougsgblxw.supabase.co/storage/v1/object/public/images/${blog.file_url}`}
                      alt="Blog Image"
                      className="w-80 h-40 rounded-lg"
                    />
                  </div>
                  <div className="flex-grow p-4">
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-700 mb-4">{blog.description}</p>
                    <div className="flex space-x-2">
                      
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No blogs found.</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <p
      className="fixed left-0 top-30 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl 
    dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
    >
      Please Login to view content&nbsp;
    </p>
  );
};

export default UserGreetText;
