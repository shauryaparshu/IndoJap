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
import { Event } from "@/data/types";
import getAllEvents from "@/lib/getAllEvents";
import AdBanner from "@/components/Sections/AdBanner";
import SectionUpcommingEvents from "./SectionUpcommingEvents";

export interface SidebarProps {
  className?: string;
}

const widgetPosts: PostDataType[] = DEMO_POSTS.filter((_, i) => i >7);


export const Sidebar: FC<SidebarProps> = async ({ className = "space-y-6 " }) => {
  const eventData = await getAllEvents();
  const events = eventData.Items;
  if (!events) {
    return <p>Blogs not found!</p>;
  }

  return (
    <div className={`nc-SingleSidebar ${className}`}>
      <SectionUpcommingEvents events={events}/>
       {/* <SectionAds /> */}
       <div className="mb-5">
          <AdBanner dataAdSlot="1366850428" dataAdFormat="auto" dataFullWidthResponsive={true} />
          </div>
    </div>
  );
};
