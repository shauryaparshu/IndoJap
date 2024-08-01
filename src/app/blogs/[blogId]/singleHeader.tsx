"use client";

import React, { FC } from "react";
import EventCategoryBadgeList from "@/components/EventCategoryBadgeList/EventCategoryBadgeList";
import SingleTitle from "@/app/(singles)/SingleTitle";
import SingleMetaAction2 from "@/app/(singles)/SingleMetaAction2";
import { Blog } from "@/data/types";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  blog: Blog;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  blog,
}) => {
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <EventCategoryBadgeList EventCategorie={blog.category} />
          <SingleTitle mainClass={titleMainClass} title={blog.title} />
          {!hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis tempora obcaecati error ipsum voluptatibus sed
              adipisci ut maiores nesciunt quam.
            </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
            <div className="flex-grow"></div>
            <SingleMetaAction2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
