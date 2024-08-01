"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import Label from "@/components/Label/Label";
import { useRouter } from "next/router";

import { Blog } from "@/data/types";

interface Params {
  params: Blog;
}
const UpdateBlog = ({ params: { blogId } }: Params) => {
  const [formData, setFormData] = useState({
    title: "",
    categories: "",
    content: "",
    featuredImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Food",
    "Cultural",
    "Industrial",
    "Tools",
    "Devotion",
    "Automotive",
    "Health",
    "Electronics",
    "Sports",
    "Computers",
    "Education",
    "Beauty",
    "Books",
    "Lifestyle",
  ];

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://g6kl4aeeb0.execute-api.us-east-1.amazonaws.com/blogs/${blogId}`);
        if (response.ok) {
          const blogData = await response.json();
          setFormData({
            title: blogData.title,
            categories: blogData.categories,
            content: blogData.content,
            featuredImage: null,
          });
        } else {
          const errorData = await response.text();
          setError(errorData);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("An error occurred while fetching the blog data.");
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      featuredImage: file,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: "",
          categories: "",
          content: "",
          featuredImage: null,
        });
      } else {
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("An error occurred while updating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {success ? (
        <div className="text-green-500 font-bold">Blog updated successfully!</div>
      ) : (
        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <label className="block md:col-span-2">
            <Label>Post Title *</Label>
            <Input
              type="text"
              name="title"
              className="mt-1"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="block">
            <Label>Category</Label>
            <Select
              name="categories"
              className="mt-1"
              value={formData.categories}
              onChange={handleChange}
              required
            >
              <option value="">– select –</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </label>

          <div className="block md:col-span-2">
            <Label>Featured Image</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="featuredImage"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
              </div>
            </div>
          </div>

          <label className="block md:col-span-2">
            <Label>Post Content</Label>
            <Textarea
              name="content"
              className="mt-1"
              rows={16}
              value={formData.content}
              onChange={handleChange}
              required
            />
          </label>
          
          {error && <div className="text-red-500 font-bold">{error}</div>}
          <ButtonPrimary className="md:col-span-2" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update post"}
          </ButtonPrimary>
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;
