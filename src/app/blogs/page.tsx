import React from "react";
import Image from "next/image";
import SingleHeader from "@/app/(singles)/SingleHeader";
import SingleContent from "./SingleContent";
import SingleRelatedPosts from "./SingleRelatedPosts";
import { Sidebar } from "./Sidebar";
 
const PageSingleTemplate3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
        {/* SINGLE HEADER */}
        <div className="dark container relative z-10">
          <div className="max-w-screen-md">
            <SingleHeader hiddenDesc />
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
          <div className="hidden md:block absolute top-0 start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
          <Image
            className="block w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1554941068-a252680d25d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
            alt=""
            width={1635}
            height={774}
            sizes="(max-width: 1024px) 100vw, 1240px"
          />
        </div>
      </header>

      <div className={`relative`}>
        {children}

        <div className="container flex flex-col my-10 lg:flex-row ">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            <SingleContent />
          </div>
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
            <Sidebar />
          </div>
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts />
      </div>
    </>
  );
};

export default PageSingleTemplate3;
