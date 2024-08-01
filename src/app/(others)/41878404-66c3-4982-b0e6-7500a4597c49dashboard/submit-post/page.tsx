"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Label from "@/components/Label/Label";
import mammoth from "mammoth";
import Textarea from "@/components/Textarea/Textarea";

const DashboardSubmitPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    dateTime: "",
    location: "",
    price: "",
    categories: "",
    content: "",
    image: "",
    poster: "",
  });
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [posterPreview, setPosterPreview] = useState("");

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
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handlePosterChange = (e:any) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      poster: file,
    }));
    setPosterPreview(URL.createObjectURL(file));
  };

  const handleDocxChange = async (e:any) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".docx")) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setFormData((prevData) => ({
          ...prevData,
          content: result.value,
        }));
      } catch (error) {
        console.error("Error converting docx to HTML:", error);
        setError("Error converting DOCX file.");
      }
    }
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
    "Tech",
    "Design",
    "Beauty",
    "Books",
    "Lifestyle",
    "Graphic Design",
  ];

  const formatDateTime = (e:any) => {
    const input = e.target.value;
    const date = new Date(input);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    setFormattedDateTime(formattedDate);
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

      const response = await fetch("/api/events", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: "",
          desc: "",
          dateTime: "",
          location: "",
          price: "",
          categories: "",
          content: "",
          image: "",
          poster: "",
        });
        setImagePreview("");
        setPosterPreview("");
      } else {
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("An error occurred while submitting the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {success ? (
        <div className="text-green-500 font-bold">
          Post submitted successfully!
        </div>
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
              value={formData.dateTime}
              onChange={(e) => {
                handleChange(e);
                formatDateTime(e);
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
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
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
                    className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 dark:text-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
          <div className="block md:col-span-2">
            <Label>Poster Image</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {posterPreview && (
                  <img
                    src={posterPreview}
                    alt="Poster Preview"
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
                    htmlFor="poster-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 dark:text-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="poster-upload"
                      name="poster"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handlePosterChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
          <label className="block md:col-span-2">
            <Label>Upload DOCX File</Label>
            <Input
              type="file"
              name="docx"
              accept=".docx"
              className="mt-1"
              onChange={handleDocxChange}
              required
            />
            <p className="mt-1 text-sm text-neutral-500">
              Upload the content of your post in DOCX format.
            </p>
          </label>
          <div className="block md:col-span-2 text-right">
            <ButtonPrimary type="submit" loading={loading}>
              Submit
            </ButtonPrimary>
          </div>
          {error && (
            <div className="md:col-span-2 text-red-500 font-semibold">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default DashboardSubmitPost;


// "use client";

// import React, { useState } from "react";
// import Input from "@/components/Input/Input";
// import ButtonPrimary from "@/components/Button/ButtonPrimary";
// import Select from "@/components/Select/Select";
// import Textarea from "@/components/Textarea/Textarea";
// import Label from "@/components/Label/Label";

// const DashboardSubmitPost = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//     dateTime: "", 
//     location: "",
//     price: "",
//     categories: "",
//     content: "",
//     image: "",
//     poster: "",
//   });
//   const [formattedDateTime, setFormattedDateTime] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [posterPreview, setPosterPreview] = useState("");

//   const handleChange = (e:any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e:any) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       image: file,
//     }));
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handlePosterChange = (e:any) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       poster: file,
//     }));
//     setPosterPreview(URL.createObjectURL(file));
//   };

//   const categories = [
//     "Garden",
//     "Food",
//     "Cultural",
//     "Industrial",
//     "Tools",
//     "Devotion",
//     "Automotive",
//     "Toys",
//     "Outdoors",
//     "Health",
//     "Electronics",
//     "Sports",
//     "Tech",
//     "Design",
//     "Beauty",
//     "Books",
//     "Lifestyle",
//     "Graphic Design",
//   ];

//   const formatDateTime = (e:any) => {
//     const input = e.target.value;
//     const date = new Date(input);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
//     setFormattedDateTime(formattedDate);
//   };

//   const handleSubmit = async (e:any) => {
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

//       const response = await fetch("/api/events", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         setSuccess(true);
//         setFormData({
//           title: "",
//           desc: "",
//           dateTime: "",
//           location: "",
//           price: "",
//           categories: "",
//           content: "",
//           image: "",
//           poster: "",
//         });
//         setImagePreview("");
//         setPosterPreview("");
//       } else {
//         const errorData = await response.text();
//         setError(errorData);
//       }
//     } catch (error) {
//       console.error("Error submitting post:", error);
//       setError("An error occurred while submitting the post.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
//       {success ? (
//         <div className="text-green-500 font-bold">
//           Post submitted successfully!
//         </div>
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
//           <label className="block md:col-span-2">
//             <Label>Post Excerpt</Label>
//             <Textarea
//               className="mt-1"
//               rows={3}
//               name="desc"
//               value={formData.desc}
//               onChange={handleChange}
//             />
//             <p className="mt-1 text-sm text-neutral-500">
//               Brief description for your article. URLs are hyperlinked.
//             </p>
//           </label>
//           <label className="block">
//             <Label>Date and Time *</Label>
//             <Input
//               type="datetime-local"
//               className="mt-1"
//               name="dateTime"
//               required
//               value={formData.dateTime}
//               onChange={(e) => {
//                 handleChange(e);
//                 formatDateTime(e);
//               }}
//             />
//           </label>
//           <label className="block">
//             <Label>Location *</Label>
//             <Input
//               type="text"
//               className="mt-1"
//               name="location"
//               required
//               value={formData.location}
//               onChange={handleChange}
//             />
//           </label>
//           <label className="block">
//             <Label>Price</Label>
//             <Input
//               type="text"
//               className="mt-1"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </label>
//           <label className="block">
//             <Label>Category</Label>
//             <Select
//               className="mt-1"
//               name="categories"
//               value={formData.categories}
//               onChange={handleChange}
//             >
//               <option value="NA">– select –</option>
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
//                 {imagePreview && (
//                   <img
//                     src={imagePreview}
//                     alt="Image Preview"
//                     className="mx-auto mb-2"
//                     style={{ maxWidth: "100%", maxHeight: "200px" }}
//                   />
//                 )}
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
//                       name="file-upload"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-neutral-500">
//                   PNG, JPG, GIF up to 10MB
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="block md:col-span-2">
//             <Label>Poster Image</Label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 {posterPreview && (
//                   <img
//                     src={posterPreview}
//                     alt="Poster Preview"
//                     className="mx-auto mb-2"
//                     style={{ maxWidth: "100%", maxHeight: "200px" }}
//                   />
//                 )}
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
//                     htmlFor="poster-upload"
//                     className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
//                   >
//                     <span>Upload a poster</span>
//                     <input
//                       id="poster-upload"
//                       name="poster-upload"
//                       type="file"
//                       className="sr-only"
//                       onChange={handlePosterChange}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-neutral-500">
//                   PNG, JPG, GIF up to 10MB. Recommended dimensions: 912x1280px.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <label className="block md:col-span-2">
//             <Label>Content *</Label>
//             <Textarea
//               className="mt-1"
//               rows={5}
//               name="content"
//               required
//               value={formData.content}
//               onChange={handleChange}
//             />
//           </label>
//           {error && (
//             <div className="md:col-span-2 text-red-500 font-bold">{error}</div>
//           )}
//           <div className="md:col-span-2">
//             <ButtonPrimary type="submit" loading={loading}>
//               Submit
//             </ButtonPrimary>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default DashboardSubmitPost;


// "use client";

// import React, { useState } from "react";
// import Input from "@/components/Input/Input";
// import ButtonPrimary from "@/components/Button/ButtonPrimary";
// import Select from "@/components/Select/Select";
// import Textarea from "@/components/Textarea/Textarea";
// import Label from "@/components/Label/Label";

// const DashboardSubmitPost = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//     dateTime: "",
//     location: "",
//     price: "",
//     categories: "",
//     content: "",
//     image: "",
//     poster: "",
//   });
//   const [formattedDateTime, setFormattedDateTime] = useState("");
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

//   const handleImageChange = (e: any) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       image: file,
//     }));
//   };

//   const handlePosterChange = (e: any) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       poster: file,
//     }));
//   };

//   const categories = [
//         "Garden",
//         "Food",
//         "Cultural",
//         "Industrial",
//         "Tools",
//         "Devotion",
//         "Automotive",
//         "Toys",
//         "Outdoors",
//         "Health",
//         "Electronics",
//         "Sports",
//         "Tech",
//         "Design",
//         "Beauty",
//         "Books",
//         "Lifestyle",
//         "Graphic Design",
//       ];
    

//   const formatDateTime = (e: any) => {
//     const input = e.target.value;
//     const date = new Date(input);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
//     setFormattedDateTime(formattedDate);
//   };

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

//       const response = await fetch("/api/events", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         setSuccess(true);
//         setFormData({
//           title: "",
//           desc: "",
//           dateTime: "",
//           location: "",
//           price: "",
//           categories: "",
//           content: "",
//           image: "",
//           poster: "",
//         });
//       } else {
//         const errorData = await response.text();
//         setError(errorData);
//       }
//     } catch (error) {
//       console.error("Error submitting post:", error);
//       setError("An error occurred while submitting the post.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
//       {success ? (
//         <div className="text-green-500 font-bold">
//           Post submitted successfully!
//         </div>
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
//           <label className="block md:col-span-2">
//             <Label>Post Excerpt</Label>
//             <Textarea
//               className="mt-1"
//               rows={3}
//               name="desc"
//               value={formData.desc}
//               onChange={handleChange}
//             />
//             <p className="mt-1 text-sm text-neutral-500">
//               Brief description for your article. URLs are hyperlinked.
//             </p>
//           </label>
//           <label className="block">
//             <Label>Date and Time *</Label>
//             <Input
//               type="datetime-local"
//               className="mt-1"
//               name="dateTime"
//               required
//               value={formData.dateTime}
//               onChange={(e) => {
//                 handleChange(e);
//                 formatDateTime(e);
//               }}
//             />
//           </label>
//           <label className="block">
//             <Label>Location *</Label>
//             <Input
//               type="text"
//               className="mt-1"
//               name="location"
//               required
//               value={formData.location}
//               onChange={handleChange}
//             />
//           </label>
//           <label className="block">
//             <Label>Price</Label>
//             <Input
//               type="text"
//               className="mt-1"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </label>
//           <label className="block">
//             <Label>Category</Label>
//             <Select
//               className="mt-1"
//               name="categories"
//               value={formData.categories}
//               onChange={handleChange}
//             >
//               <option value="NA">– select –</option>
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
//                       name="file-upload"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-neutral-500">
//                   PNG, JPG, GIF up to 10MB
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="block md:col-span-2">
//             <Label>Poster Image</Label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <svg
//                   className="mx-auto h-12 w-12 text-neutral-400"
//                   stroke="currentColor"
//                   fill="none"
//                   viewBox="0 0 48 48"
//                   aria-hidden="true"
//                 >
//                    <path
//                     d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   ></path>
//                 </svg>
//                 <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
//                   <label
//                     htmlFor="poster-upload"
//                     className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
//                   >
//                     <span>Upload a poster</span>
//                     <input
//                       id="poster-upload"
//                       name="poster-upload"
//                       type="file"
//                       className="sr-only"
//                       onChange={handlePosterChange}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-neutral-500">
//                   PNG, JPG, GIF up to 10MB. Recommended dimensions: 912x1280px.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <label className="block md:col-span-2">
//             <Label>Content *</Label>
//             <Textarea
//               className="mt-1"
//               rows={5}
//               name="content"
//               required
//               value={formData.content}
//               onChange={handleChange}
//             />
//           </label>
//           {error && (
//             <div className="md:col-span-2 text-red-500 font-bold">{error}</div>
//           )}
//           <div className="md:col-span-2">
//             <ButtonPrimary type="submit" loading={loading}>
//               Submit
//             </ButtonPrimary>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default DashboardSubmitPost;
