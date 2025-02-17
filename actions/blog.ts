"use server";
import Blog from "../models/Blog";
import connectDB from "../lib/connectDB";


export async function createBlog(param) 
{
    await connectDB();

    const exist = await Blog.findOne({"title": param.title});
    if(exist)
    {
        throw new Error("Blog already exist");
    }else{

   const ins = await Blog.create({"title": param.title, "excerpt": param.excerpt, "date": param.date, "content": param.content, "category": param.category, "image": param.image, "FullContent": param.FullContent, "tags": param.tags});
    
    if(ins)
    {
        return JSON.parse(JSON.stringify(ins));
    }

    }
}
export async function getBlogs()
{
    await connectDB();
    const blogs = await Blog.find();
    if(blogs)
    {
        return JSON.parse(JSON.stringify(blogs));
    }
}
export async function getBlogsbyId(id)
{
    await connectDB();
    const blog = await Blog.findById(id);
    if(blog)
    {
        return JSON.parse(JSON.stringify(blog));
    }
}