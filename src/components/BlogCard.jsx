import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <Link
      to={`/blogs/${post.id}`}
      className="block border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer group"
    >
    
      <div className="relative h-60 overflow-hidden">
        <img
          src={`https://picsum.photos/600/400?random=${post.id}`}
          alt="blog"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <span className="text-white text-3xl">↗</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold leading-tight line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed">
          {post.body.slice(0, 100)}...
        </p>

        <span className="inline-block text-blue-600 font-medium hover:underline">
          Read More →
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;