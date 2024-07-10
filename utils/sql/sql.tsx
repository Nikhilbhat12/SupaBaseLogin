import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const insertBlog = async (
  title: string,
  description: string,
  fileUrl?: string,
  user_id?: string
) => {
  try {
    const { data, error } = await supabase.from('blogs').insert({
      title,
      description,
      file_url: fileUrl,
      user_id: user_id,
    });

    if (error) {
      throw error;
    }

    console.log('Blog inserted successfully:', data);
  } catch (error: any) {
    console.error('Error inserting blog:', error.message);
  }
};

export const updateBlog = async (
  id: string,
  title: string,
  description: string,
  fileUrl?: string
) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({
        title,
        description,
        file_url: fileUrl,
      })
      .eq('id', id);

    if (error) {
      throw error;
    }

    console.log('Blog updated successfully:', data);
  } catch (error: any) {
    console.error('Error updating blog:', error.message);
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const { data, error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
      throw error;
    }

    console.log('Blog deleted successfully:', data);
  } catch (error: any) {
    console.error('Error deleting blog:', error.message);
  }
};

export const getBlogs = async () => {
  try {
    const { data, error } = await supabase.from('blogs').select('*');

    if (error) {
      throw error;
    }
    console.log('Blogs retrieved successfully:', data);
  } catch (error: any) {
    console.error('Error retrieving blogs:', error.message);
  }
};

export const getBlogsById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    console.log('Blog retrieved successfully by ID:', data);
  } catch (error: any) {
    console.error('Error retrieving blog by ID:', error.message);
  }
};

export const getBlogsByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.log(error, "error from getblogsby id");
      
      throw error;
    }



    console.log('Blogs retrieved successfully by user ID:', data);
    return data
  } catch (error: any) {
    console.error('Error retrieving blogs by user ID:', error.message);
  }
};

