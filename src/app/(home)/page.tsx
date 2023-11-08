import React from "react";
import { DEMO_CATEGORIES, DEMO_TAGS } from "@/data/taxonomies";
import { DEMO_POSTS, DEMO_POSTS_AUDIO } from "@/data/posts";
import SectionHero from "@/components/SectionHero/SectionHero";
import rightImg from "@/images/hero-right.png";
import Vector1 from "@/images/Vector1.png";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import Image from "next/image";
import SectionMagazine5 from "@/components/Sections/SectionMagazine5";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import ModalCategories from "@/app/(archives)/ModalCategories";
import ModalTags from "@/app/(archives)/ModalTags";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Card11 from "@/components/Card11/Card11";
import { PostDataType } from "@/data/types";
import HeaderFilter from "@/components/Sections/HeaderFilter";
import Heading from "@/components/Heading/Heading";

// DEMO DATA
const POSTS = DEMO_POSTS;
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const PageHomeDemo3: React.FC = () => {
  
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        {/* hero section */}
        <SectionHero
          rightImg={rightImg}
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <span>
              {/* Far from face <br /> but not from {` `} */}
              Discover Vibrant Indian Events in 
              <span className="relative pr-3">
                <Image
                  className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                  src={Vector1}
                  alt=""
                />
                <span className="relative">Japan</span>
              </span>
            </span>
          }
          btnText="Explore Events"
          subHeading="Join the Celebration: Explore a world of Indian culture, traditions, and experiences right here in Japan!"
        />
          
          {/* Events section */}
    <div>
          
        <h2 className="font-semibold text-4xl"> Events </h2>
        <br />
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              <ModalCategories categories={DEMO_CATEGORIES} />
              <ModalTags tags={DEMO_TAGS} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {posts.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
    </div>
    <br />

        {/* Articles section */}
        <div className="relative py-16"> 
          <BackgroundSection />
          <SectionMagazine5 heading="Latest Articles" posts={MAGAZINE1_POSTS} />
        </div>

       

        {/* <SectionAds /> */}

       {/* NewsLetter */}
        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default PageHomeDemo3;
