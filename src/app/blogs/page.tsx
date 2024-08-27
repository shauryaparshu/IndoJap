import React, { FC, ReactNode } from "react";
import Image from "next/image";
import SingleHeader from "@/app/(singles)/SingleHeader";
import SingleRelatedPosts from "./SingleRelatedPosts";
import { Sidebar } from "./Sidebar";
import SectionLatestBlogs from "./SectionLatestBlogs";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import getAllblogs from "@/lib/getAllBlogs";
import { Blog } from "@/data/types";

// export interface PageSingleTemplate3Props {
//   children: ReactNode;
// }
type PageSingleTemplate3 = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 0;

// const PageSingleTemplate3: FC<PageSingleTemplate3Props> = ({ children }) => {
const PageSingleTemplate3 = async ({ searchParams }: PageSingleTemplate3) => {
  
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  
  const blogData = await getAllblogs();
  const blogs = category
    ? blogData.Items.filter((blog: Blog) => blog.category.includes(category))
    : blogData.Items;


  if (!blogs) {
    return <p>Blogs not found!</p>;
  }

  return (
    <>
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto pt-2">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
          <Image
            alt="archive"
            fill
            src="https://dev-indojap-site-imageuploadsbucketc6e2667e-tz5tcenzwzys.s3.amazonaws.com/blogimage.jpg"
            className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              Blogs
            </h2>
            <span className="block mt-4 text-neutral-300">{blogs.length} Blogs</span>
          </div>
        </div>
      </div>
      <br />
      <div className="nc-PageHomeDemo3 relative">
        <div className="container relative">
          <div className="relative py-16">
            <BackgroundSection />
            <SectionLatestBlogs blogs={blogs} className="pb-16 lg:pb-28" category={category} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSingleTemplate3;
