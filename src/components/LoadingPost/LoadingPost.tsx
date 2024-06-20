import React from "react";

const LoadingPost = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className=" shadow rounded-lg rounded-t-3xl p-4 max-w-sm w-full mx-auto animate-pulse"
        >
          <div>
            <div className="rounded-lg bg-gray-300 h-36 sm:h-36 w-full"></div>
          </div>
          <div className="mt-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1 sm:w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded mb-1 sm:w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="flex items-center mt-4">
              <div className="rounded-full bg-gray-300 h-8 w-8"></div>
              <span className="ml-2 bg-gray-300 rounded h-4 w-16"></span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-300 rounded w-6"></div>
                <div className="h-4 bg-gray-300 rounded w-10"></div>
              </div>
              <div className="bg-gray-300 rounded h-4 w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingPost;
