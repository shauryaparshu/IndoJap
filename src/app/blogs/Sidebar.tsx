import React, { FC } from "react";
import WidgetAuthors from "@/components/WidgetAuthors/WidgetAuthors";
import WidgetCategories from "@/components/WidgetCategories/WidgetCategories";
import WidgetPosts from "@/components/WidgetPosts/WidgetPosts";
import WidgetTags from "@/components/WidgetTags/WidgetTags";
import { DEMO_AUTHORS } from "@/data/authors";
import { DEMO_POSTS } from "@/data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS } from "@/data/taxonomies";
import { PostDataType } from "@/data/types";
import SectionAds from "@/components/Sections/SectionAds";
import { Blog } from "@/data/types";
import getAllBlogs from "@/lib/getAllBlogs";

export interface SidebarProps {
  className?: string;
}

const widgetPosts: PostDataType[] = DEMO_POSTS.filter((_, i) => i >7);


export const Sidebar: FC<SidebarProps> = async ({ className = "space-y-6 " }) => {
  const blogData = await getAllBlogs();
  const blogs = blogData.Items;
  if (!blogs) {
    return <p>Blogs not found!</p>;
  }

  return (
    <div className={`nc-SingleSidebar ${className}`}>
      <WidgetPosts blogs={blogs} />
       <SectionAds />
      
    </div>
  );
};
