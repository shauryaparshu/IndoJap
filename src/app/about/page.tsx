import React from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

const PageAbout = () => {
  return (
    <div className="container mx-auto p-6">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md mb-8">
        <p className="md:text-2xl lg:text-4xl text-center text-indigo-700 font-extrabold">About Us</p>
        <p className="text-center font-semibold my-6 text-lg md:text-xl lg:text-2xl">Celebrating Culture, Bridging Communities</p>
        <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed">
          Welcome to Japan Indian Guide, your gateway to a vibrant tapestry of Indian culture and traditions, right here in the Land of the Rising Sun.
          At Indian Japan Guide, we are more than just a website; we are a celebration of the rich and diverse tapestry of Indian festivals and events, carefully curated to bring the essence of India to the heart of Japan. Our mission is to foster a sense of belonging, togetherness, and connection for the Indian community living and working in Japan.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md mb-8">
        <p className="md:text-2xl lg:text-3xl text-center text-indigo-700 font-extrabold my-6">Our Journey</p>
        <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed">
          Born out of a deep love for Indian culture and a strong desire to connect and engage with the Indian diaspora in Japan, <span className="text-2xl font-medium text-blue-600 truncate">Indian Japan Guide</span> is the brainchild of passionate individuals who understand the challenges and joys of living in a foreign land. We have felt the nostalgia of festivals back home and the excitement of experiencing them in a new cultural setting.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md m-5 w-full lg:w-2/5 flex flex-col items-center">
          <h3 className="dark:text-white text-center text-indigo-700 font-extrabold md:text-xl lg:text-2xl my-6">Contact Us</h3>
          <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed mb-5">
            We value your input, questions, and feedback. Whether you have suggestions for new content, want to collaborate, or just wish to say hello, we are thrilled to hear from you.
          </p>
          <ButtonPrimary type="submit" href="/contact">Send Message</ButtonPrimary>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md m-5 w-full lg:w-1/3">
          <h3 className="dark:text-white text-center text-indigo-700 font-extrabold md:text-xl lg:text-2xl my-6">Connect with Us</h3>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm md:text-base lg:text-lg leading-relaxed">
            Email: <a href="mailto:indiajapanguide@gmail.com" className="text-sky-600">indiajapanguide@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
