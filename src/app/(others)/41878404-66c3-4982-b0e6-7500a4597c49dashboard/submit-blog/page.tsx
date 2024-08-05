"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Label from "@/components/Label/Label";

const DashboardSubmitBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    categories: "", 
    contentFile: null, 
    featuredImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");
  const [contentFilePreview, setContentFilePreview] = useState("");

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e:any) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));

    if (name === "featuredImage") {
      setFeaturedImagePreview(URL.createObjectURL(file));
    } else if (name === "contentFile") {
      setContentFilePreview(file.name); // For docx file, just show the file name
    }
  };

  const categories = [
    "Automotive",
    "Beauty",
    "Books",
    "Computers",
    "Cultural",
    "Devotion",
    "Education",
    "Electronics",
    "Food",
    "Health",
    "Interaction",
    "Industrial",
    "Lifestyle",
    "Sports",
    "Tools",
    "Workshops"
  ];
  

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

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: "",
          categories: "",
          contentFile: null,
          featuredImage: null,
        });
        setFeaturedImagePreview("");
        setContentFilePreview("");
      } else {
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      setError("An error occurred while submitting the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {success ? (
        <div className="text-green-500 font-bold">Blog submitted successfully!</div>
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
                {featuredImagePreview && (
                  <img
                    src={featuredImagePreview}
                    alt="Featured Image Preview"
                    className="mx-auto mb-2"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
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
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
              </div>
            </div>
          </div>

          <label className="block md:col-span-2">
            <Label>Post Content (.docx file)</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {contentFilePreview && (
                  <div className="mx-auto mb-2 text-neutral-700">
                    {contentFilePreview}
                  </div>
                )}
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
                    htmlFor="content-file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="content-file-upload"
                      name="contentFile"
                      type="file"
                      className="sr-only"
                      accept=".docx"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">DOCX up to 10MB</p>
              </div>
            </div>
          </label>

          {error && <div className="text-red-500 font-bold">{error}</div>}
          <ButtonPrimary className="md:col-span-2" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit post"}
          </ButtonPrimary>
        </form>
      )}
    </div>
  );
};

export default DashboardSubmitBlog;



// "use client";

// import React, { useState } from "react";
// import Input from "@/components/Input/Input";
// import ButtonPrimary from "@/components/Button/ButtonPrimary";
// import Select from "@/components/Select/Select";
// import Label from "@/components/Label/Label";

// const DashboardSubmitBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     categories: "", 
//     contentFile: null, 
//     featuredImage: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e: any) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: file,
//     }));
//   };

//   const categories = [
//     "Food",
//     "Cultural",
//     "Industrial",
//     "Tools",
//     "Devotion",
//     "Automotive",
//     "Health",
//     "Electronics",
//     "Sports",
//     "Computers",
//     "Education",
//     "Beauty",
//     "Books",
//     "Lifestyle",
//   ];

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formDataToSend = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null) {
//           formDataToSend.append(key, value);
//         }
//       });

//       const response = await fetch("/api/blogs", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         setSuccess(true);
//         setFormData({
//           title: "",
//           categories: "",
//           contentFile: null,
//           featuredImage: null,
//         });
//       } else {
//         const errorData = await response.text();
//         setError(errorData);
//       }
//     } catch (error) {
//       console.error("Error submitting blog:", error);
//       setError("An error occurred while submitting the blog.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
//       {success ? (
//         <div className="text-green-500 font-bold">Blog submitted successfully!</div>
//       ) : (
//         <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
//           <label className="block md:col-span-2">
//             <Label>Post Title *</Label>
//             <Input
//               type="text"
//               name="title"
//               className="mt-1"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label className="block">
//             <Label>Category</Label>
//             <Select
//               name="categories"
//               className="mt-1"
//               value={formData.categories}
//               onChange={handleChange}
//               required
//             >
//               <option value="">– select –</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </Select>
//           </label>

//           <div className="block md:col-span-2">
//             <Label>Featured Image</Label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <svg
//                   className="mx-auto h-12 w-12 text-neutral-400"
//                   stroke="currentColor"
//                   fill="none"
//                   viewBox="0 0 48 48"
//                   aria-hidden="true"
//                 >
//                   <path
//                     d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   ></path>
//                 </svg>
//                 <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
//                   <label
//                     htmlFor="file-upload"
//                     className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="file-upload"
//                       name="featuredImage"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleFileChange}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
//               </div>
//             </div>
//           </div>

//           <label className="block md:col-span-2">
//             <Label>Post Content (.docx file)</Label>
//             <input
//               type="file"
//               name="contentFile"
//               className="mt-1"
//               accept=".docx"
//               onChange={handleFileChange}
//               required
//             />
//           </label>

//           {error && <div className="text-red-500 font-bold">{error}</div>}
//           <ButtonPrimary className="md:col-span-2" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit post"}
//           </ButtonPrimary>
//         </form>
//       )}
//     </div>
//   );
// };

// export default DashboardSubmitBlog;
