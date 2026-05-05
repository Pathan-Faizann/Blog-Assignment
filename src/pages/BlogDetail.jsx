import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPosts } from "../services/api";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";

const BlogDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts();

        const foundPost = data.find((p) => p.id === Number(id));

        setPost(foundPost);
        setAllPosts(data);
        
       
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError("Failed to load blog");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  
  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Skeleton />
        <div className="mt-6 space-y-3 animate-pulse">
          <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-300 w-full rounded"></div>
          <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
        </div>
      </div>
    );
  }

  
  if (error || !post) {
    return (
      <div className="text-center text-red-500 mt-10">
        Blog not found
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-black h-[400px] text-white px-6 py-44 sm:px-10 sm:py-20 shadow-sm text-center">
        <Link to="/blogs" className="inline-block text-sm text-blue-300 hover:text-white mb-6">
          ← Back to Blogs
        </Link>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto">
          {post.title}
        </h1>

        <p className="mt-5 text-gray-300  text-sm sm:text-base">
          By Admin 05-05-26
        </p>
      </div>

      <div className="flex -mt-12 justify-center px-6 sm:px-10">
        <img
          src={`https://picsum.photos/1200/640?random=${post.id}`}
          alt="blog"
          className="w-full max-w-4xl h-[500px] object-cover shadow-2xl"
        />
      </div>

      <div className="flex justify-center px-6 sm:px-10 mt-10">
        <div className="bg-white p-8 sm:p-10 max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5">
            {post.title}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            {post.body}
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-10 mt-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Related Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allPosts
            .filter((p) => p.id !== post.id)
            .slice(0, 3)
            .map((item) => (
              <BlogCard key={item.id} post={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;