"use client";
import React, { useState, useEffect } from "react";
import NcImage from "@/components/NcImage/NcImage";
import getAllBlogs from "@/lib/getAllBlogs";
import { Blog } from "@/data/types"; // Ensure you have the Blog type defined
import EventCategoryBadgeList from "@/components/EventCategoryBadgeList/EventCategoryBadgeList"; // Create a similar component like EventCategoryBadgeList

const DashboardBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogData = await getAllBlogs();
      setBlogs(blogData.Items);
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = (blog: Blog) => {
    setBlogToDelete(blog);
    setShowModal(true);
  };

  const deleteBlog = async () => {
    if (blogToDelete) {
      try {
        const response = await fetch(`https://g6kl4aeeb0.execute-api.us-east-1.amazonaws.com/blogs/${blogToDelete.blogId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Remove the deleted blog from the state
        setBlogs(
          blogs.filter((blog) => blog.blogId !== blogToDelete.blogId)
        );
        setShowModal(false);
      } catch (error) {
        console.error("Failed to delete the blog:", error);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Blog Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categories
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {blogs.map((blog: Blog) => (
                  <tr key={blog.blogId}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                          src={blog.imageURL}
                          fill
                          sizes="80px"
                          alt="post"
                        />
                        <div className="ms-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold dark:text-neutral-300">
                            {blog.title}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center align-middle">
                      <div className="text-center pl-12">
                      <EventCategoryBadgeList
                          EventCategorie={blog.category}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center align-middle text-sm text-neutral-500 dark:text-neutral-400">
                      <span>{blog.createdAt}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      {/* <a
                        href={`/dashboard/blogs/${blog.blogId}`}
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Edit
                      </a>
                      {` | `} */}
                      <button
                        onClick={() => handleDeleteBlog(blog)}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                Are you sure you want to delete the blog &quot;
                {blogToDelete?.title || "Untitled"}&quot;?
              </p>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 mr-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={deleteBlog}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBlogs;
