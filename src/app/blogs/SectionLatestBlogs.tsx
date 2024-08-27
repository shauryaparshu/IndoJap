import React, { FC } from "react";
import Card3 from "@/components/Card3/Card3";
import Heading from "@/components/Heading/Heading";
import { Blog } from "@/data/types";
import SectionAds from "@/components/Sections/SectionAds";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import ModalCategories from "./ModalCategoriesBlogs";
import AdBanner from "@/components/Sections/AdBanner";

export interface SectionLatestPostsProps {
  gridClass?: string;
  className?: string;
  heading?: string;
  blogs: Blog[];
  category: string;
}

  

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  heading = "Latest Articles",
  gridClass = "",
  className = "",
  blogs,
  category
}) => {
    
  // Sort blogs by date (assuming blogs have a 'date' field)
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
          <Heading>{heading}</Heading>
          <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ModalCategories 
                          categories={DEMO_CATEGORIES} selectedCategory={category} />     
            </div>
            <div className="block my-6"></div>
          <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
            {sortedBlogs.map((blog: Blog) => (
              <Card3 key={blog.blogId} className="py-0" post={blog} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:w-2/5 xl:ps-0 xl:w-1/3">
          <div className="sticky top-20"> 
            {/* <SectionAds /> */}
            <AdBanner dataAdSlot="9200078148" dataAdFormat="fluid" dataFullWidthResponsive={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
