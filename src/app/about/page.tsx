import React from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";



const PageAbout = ({ }) => {
  return (
    <div className="">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="m-6">
        <p className="text-3xl text-center underline text-indigo-700 font-extrabold">About Us</p>
        <p className="text-center  font-semibold  my-6 text-xl">Celebrating Culture, Bridging Communities</p>
        <p className="text-sm  text-center">Welcome to Japan Indian Guide, your gateway to a vibrant tapestry of Indian culture and traditions, right here in the Land of the Rising Sun.
          At  Indian Japan Guide, we are more than just a website; we are a celebration of the rich and diverse tapestry of Indian festivals and events, carefully curated to bring the essence of India to the heart of Japan. Our mission is to foster a sense of belonging, togetherness, and connection for the Indian community living and working in Japan.</p>
      </div>
      <div className="m-6">
        <p className="text-3xl text-center underline text-indigo-700 my-6 font-extrabold">Our Journey</p>
        <p className="text-sm  text-center">
          Born out of a deep love for Indian culture and a strong desire to connect and engage with the Indian diaspora in Japan, <span className="text-2xl font-400 text-blue-600 truncate">Indian Japan Guide</span> is the brainchild of passionate individuals who understand the challenges and joys of living in a foreign land. We have felt the nostalgia of festivals back home and the excitement of experiencing them in a new cultural setting.
        </p>
      </div>
    </div>
  );
};

export default PageAbout;
