"use client";
import blogPosts from "@/data/blogs/blogs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogsbyId } from "../../../../actions/blog";

// Corrected Type Definition
type Blog = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  content: string;
  fullContent: string;
};

export default function Page() {
  const params = useParams();
  const slug = params?.slug;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect( () => {
    if (!slug) return;

    const fetch=async()=>{
      console.log(slug);
      const newBlog = await getBlogsbyId(slug);
      console.log(newBlog);
      
      setBlog(newBlog || null);
    }
    fetch();
  }, [slug]);

  return (
    <div className="mt-24 container mx-auto p-4">
      {blog ? (
        <div>
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <p className="text-gray-600">
            {blog.date} - By {blog.author}
          </p>
          <div className="flex flex-col md:grid grid-cols-2 gap-4 border-t border-b mt-2 mb-2 ">
            
              {" "}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[80%] rounded-xl my-4"
              />
            
            <p className="my-4">{blog.FullContent}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Blog not found.</p>
      )}
    </div>
  );
}
