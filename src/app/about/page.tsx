import React from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";



const PageAbout = ({ }) => {
  return (
    <div className="m-6">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md m-6">
        <p className="md:text-xl lg:text-3xl text-center underline text-indigo-700 font-extrabold">About Us</p>
        <p className="text-center  font-semibold  my-6 text-xl">Celebrating Culture, Bridging Communities</p>
        <p className="text-sm  text-center">Welcome to Japan Indian Guide, your gateway to a vibrant tapestry of Indian culture and traditions, right here in the Land of the Rising Sun.
          At  Indian Japan Guide, we are more than just a website; we are a celebration of the rich and diverse tapestry of Indian festivals and events, carefully curated to bring the essence of India to the heart of Japan. Our mission is to foster a sense of belonging, togetherness, and connection for the Indian community living and working in Japan.</p>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md m-6">
        <p className="md:text-xl lg:text-2xl text-center  text-indigo-700 my-6 font-extrabold">Our Journey</p>
        <p className="text-sm  text-center">
          Born out of a deep love for Indian culture and a strong desire to connect and engage with the Indian diaspora in Japan, <span className="text-2xl font-400 text-blue-600 truncate">Indian Japan Guide</span> is the brainchild of passionate individuals who understand the challenges and joys of living in a foreign land. We have felt the nostalgia of festivals back home and the excitement of experiencing them in a new cultural setting.
        </p>
      </div>
      {/* -------------------------------------Contact Us----------------------------------------- */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md m-5 sm:w-3/5">
          <h3 className="dark:text-white mt-5  mb-5  tracking-tight text-center text-indigo-700 my-6 font-extrabold  md:text-xl lg:text-2xl">Contact Us</h3>
          <p className=" mb-5 text-sm text-center">
            We value your input, questions, and feedback. Whether you have suggestions for new content, want to collaborate, or just wish to say hello, we are thrilled to hear from you.
          </p>
        </div>
        {/* ------------------------------------------------------------ */}
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md  m-5 lg:w-1/3">
          <h3 className="dark:text-white mt-5  mb-5  tracking-tight text-center text-indigo-700 my-6 font-extrabold md:text-xl lg:text-2xl">Connect with Us</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-5 text-sm text-center">
            Email:<span className="text-sky-600"> lorem.123@gmail.com</span>
          </p>
        </div>
      </div>
      {/* ------------ */}
    </div>
  );
};

export default PageAbout;
