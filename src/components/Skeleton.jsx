const Skeleton = () => {
  return (
    <div className="animate-pulse border border-gray-200 bg-white rounded-3xl overflow-hidden">
      <div className="bg-gray-300 h-52 w-full"></div>

      <div className="p-6 space-y-4">
        <div className="bg-gray-300 h-5 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-full rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;