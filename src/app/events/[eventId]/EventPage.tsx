"use client";

import React, { FC } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "@/app/(singles)/SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "@/app/(singles)/SingleMetaAction2";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { Event } from "@/data/types";
import EventCategoryBadgeList from "@/components/EventCategoryBadgeList/EventCategoryBadgeList";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  event: Event;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  event,
  hiddenDesc = false,
  className = "",
}) => {
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <EventCategoryBadgeList EventCategorie={event.categories} />
          <SingleTitle mainClass={titleMainClass} title={event.title} />
          {!hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {event.desc}
            </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
              <div className="flex items-center space-x-2 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2">
                <span className="text-sm font-semibold uppercase">
                  Date & Time
                </span>
                <span className="text-lg font-bold">{event.dateTime}</span>
              </div>
              <div className="hidden sm:block sm:px-1">
                <div className="border-s border-neutral-200 dark:border-neutral-700 h-6" />
              </div>
              <div className="flex items-center space-x-2 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2">
                <span className="text-sm font-semibold uppercase">Price</span>
                <span className="text-lg font-bold">¥{event.price}</span>
              </div>
              <div className="hidden sm:block sm:px-1">
                <div className="border-s border-neutral-200 dark:border-neutral-700 h-6" />
              </div>
              <div className="flex items-center space-x-2 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2">
                <span className="text-sm font-semibold uppercase">
                  Location
                </span>
                <span className="text-lg font-bold">{event.location}</span>
              </div>
            </div>
            {/* <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            /> */}
            <SingleMetaAction2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
