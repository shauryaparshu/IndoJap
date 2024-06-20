"use client";

import React, { useEffect, useState, useCallback } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import Label from "@/components/Label/Label";
import getEvent from "@/lib/getEvent";
import { Event } from "@/data/types";

interface Params {
  params: Event;
}

interface FormData {
  title: string;
  eventId: string;
  desc: string;
  dateTime: string;
  location: string;
  price: string;
  categories: string;
  postContent: string;
  image: File | null; // Correctly typed as File or null
}

export default function UpdatePost({ params: { eventId } }: Params) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    eventId: "",
    desc: "",
    dateTime: "",
    location: "",
    price: "",
    categories: "",
    postContent: "",
    image: null, // Set the initial value of image to null
  });

  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Memoize the fetchEventData function to avoid unnecessary re-renders
  const fetchEventData = useCallback(async (eventId: string) => {
    try {
      const eventData = await getEvent(eventId);
      setFormData(eventData);
      const date = new Date(eventData.dateTime);
      const formattedDate = formatDateTime(date);
      setFormattedDateTime(formattedDate);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  }, []);

  // Include fetchEventData in the dependency array
  useEffect(() => {
    fetchEventData(eventId);
  }, [eventId, fetchEventData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const categories = [
    "Garden",
    "Food",
    "Cultural",
    "Industrial",
    "Tools",
    "Devotion",
    "Automotive",
    "Toys",
    "Outdoors",
    "Health",
    "Electronics",
    "Sports",
    "Computers",
    "Design",
    "Beauty",
    "Books",
    "Lifestyle",
    "Graphic Design",
  ];

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value as string | Blob);
        }
      });

      const response = await fetch(
        `https://ksed90trwf.execute-api.us-east-1.amazonaws.com/events/${formData.eventId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setError("An error occurred while updating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {success ? (
        <div className="text-green-500 font-bold">
          Event updated successfully!
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-4">Update Event</h2>
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
            <label className="block md:col-span-2">
              <Label>Post Excerpt</Label>
              <Textarea
                className="mt-1"
                rows={3}
                name="desc"
                value={formData.desc}
                onChange={handleChange}
              />
              <p className="mt-1 text-sm text-neutral-500">
                Brief description for your article. URLs are hyperlinked.
              </p>
            </label>
            <label className="block">
              <Label>Date and Time *</Label>
              <Input
                type="datetime-local"
                className="mt-1"
                name="dateTime"
                required
                value={formattedDateTime}
                onChange={(e) => {
                  handleChange(e);
                  const date = new Date(e.target.value);
                  const formattedDate = formatDateTime(date);
                  setFormattedDateTime(formattedDate);
                }}
              />
            </label>
            <label className="block">
              <Label>Location *</Label>
              <Input
                type="text"
                className="mt-1"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <Label>Price</Label>
              <Input
                type="text"
                className="mt-1"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <Label>Category</Label>
              <Select
                className="mt-1"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
              >
                <option value="NA">– select –</option>
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
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l44m4-24h8m-4-4v8m-12 4h.02"
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
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <label className="block md:col-span-2">
              <Label>Post Content</Label>
              <Textarea
                className="mt-1"
                rows={16}
                name="postContent"
                value={formData.postContent}
                onChange={handleChange}
              />
            </label>
            {error && <div className="text-red-500 font-bold">{error}</div>}
            <ButtonPrimary
              className="md:col-span-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Event"}
            </ButtonPrimary>
          </form>
        </>
      )}
    </div>
  );
}
