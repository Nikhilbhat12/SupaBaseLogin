"use client";

import { getBlogsByUserId, insertBlog } from "@/utils/sql/sql";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";
import { useSearchParams } from "next/navigation";

const Myblogs = () => {
  const supabase = createClient();
  const router = useRouter();
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [myblogs, setMyBlogs] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const user = useUser((state) => state?.user);
  const setUser = useUser((state) => state?.setUser);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log(id, "Search");

  useEffect(() => {
    async function fetchBlogDetails(blogId: any) {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId)
          .single();

        if (error) {
          throw error;
        }
        // Set form fields with existing data for editing
        setTitle(data.title);
        setDescription(data.description);
        setEditingBlog(data.id);
      } catch (error: any) {
        console.error("Error fetching blog details:", error.message);
      }
    }

    if (id && typeof id === "string") {
      fetchBlogDetails(id);
    }
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUserData(data?.user);
        setUser(data?.user);
        getMyBlogs();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const getBlogsItems = async () => {
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
  };

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

  const getMyBlogs = async () => {
    try {
      if (user?.id) {
        const blogs = await getBlogsByUserId(user.id);
        console.log("Blogs retrieved successfully by user ID:", blogs);
        if (blogs !== undefined) {
          setMyBlogs(blogs || []);
        }
      }
    } catch (error) {
      console.error("Error retrieving blogs by user ID:", error);
      setMyBlogs([]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile || null);
  };

  const handleEditClick = (blog: any) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    scrollToTop();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!file && !editingBlog?.file_url) {
        throw new Error("Please select a file.");
      }

      let fileDataPath = editingBlog?.file_url;

      if (file) {
        console.log("Uploading file...");

        const { data: fileData, error: fileError } = await supabase.storage
          .from("images")
          .upload(`files/${file.name}`, file);

        if (fileError) {
          throw fileError;
        }

        fileDataPath = fileData?.path;
      }

      if (editingBlog) {
        // console.log("Updating blog...", editingBlog);

        const { data: updateData, error: updateError } = await supabase
          .from("blogs")
          .update({ title, description, file_url: fileDataPath })
          .eq("id", editingBlog.id);

        if (updateError) {
          throw updateError;
        }

        console.log("Blog updated successfully:", updateData);
      } else {
        console.log("Inserting new blog...");

        const { data: insertData, error: insertError } = await supabase
          .from("blogs")
          .insert([{ title, description, file_url: fileDataPath, user_id: userData?.id }]);

        if (insertError) {
          throw insertError;
        }

        console.log("Blog inserted successfully:", insertData);
      }

      setTitle("");
      setDescription("");
      setFile(null);
      setEditingBlog(null);

      // Refresh blogs after successful submission
      await getMyBlogs();
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pl-10 pr-10 pt-10">
      <Button
        variant="outline"
        className="cursor-pointer flex gap-2"
        onClick={() => router.back()}
      >
        <IoMdArrowBack /> Myblogs
      </Button>

      <div className="pb-4 pt-4">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Label htmlFor="title">Title :</Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              maxLength={50}
              required
            />
          </div>
          <div className="pb-4">
            <Label htmlFor="description">Description (up to 1000 words):</Label>
            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows={5}
              maxLength={1000}
              required
            />
          </div>
          <div className="pb-4">
            <Label htmlFor="file">Upload File:</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg"
              required={!editingBlog}
            />
          </div>
          <Button type="submit">{editingBlog ? "Update" : "Submit"}</Button>
        </form>
      </div>

      <div>
        {myblogs.map((blog) => (
          <Card key={blog.id} className="shadow-md mb-4 flex ml-10 mr-10">
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
                <Button onClick={() => handleEditClick(blog)}>Edit</Button>
                <Button onClick={() => deleteBlog(blog?.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Myblogs;
