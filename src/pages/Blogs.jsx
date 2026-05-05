import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Something went wrong while fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-black text-white py-44 px-6 sm:px-10  shadow-sm mb-10">
        <h1 className="text-5xl ps-20 sm:text-6xl font-extrabold tracking-tight">
          Blogs
        </h1>
        <p className="mt-4 ps-20 text-lg text-gray-300 max-w-2xl">
          Discover the latest insights
        </p>
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest Blogs
        </h2>
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {loading
            ? Array(6).fill(0).map((_, i) => <Skeleton key={i} />)
            : posts.slice(0, visible).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
        </div>
        </div>
      </div>

      {!loading && visible < posts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((prev) => prev + 6)}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;