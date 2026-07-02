import BlogEditor from "../BlogEditor";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const metadata = { title: "Edit Blog Post | Admin" };

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  await connectDB();

  let blog = null;
  try {
    blog = await Blog.findById(id).lean();
  } catch {
    blog = null;
  }

  if (!blog) {
    return (
      <div style={{ padding: "40px", fontFamily: "'Inter',sans-serif" }}>
        <h1 style={{ color: "#DC2626" }}>Blog post not found.</h1>
      </div>
    );
  }

  // Serialize for client
  const serialized = {
    ...blog,
    _id:       blog._id.toString(),
    tags:      (blog.tags || []).join(", "),
    faqs:      blog.faqs || [],
    createdAt: blog.createdAt?.toString(),
    updatedAt: blog.updatedAt?.toString(),
  };

  return <BlogEditor existingBlog={serialized} />;
}