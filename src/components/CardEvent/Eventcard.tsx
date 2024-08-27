"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { Event } from "@/data/types";
import EventCategoryBadgeList from "@/components/EventCategoryBadgeList/EventCategoryBadgeList";
import Link from "next/link";
import EventImage from "./EventImage";

export interface EventcardProps {
  className?: string;
  event: Event;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Eventcard: FC<EventcardProps> = ({
  className = "h-full",
  event,
  hiddenAuthor = false,
  ratio = "aspect-w-5 aspect-h-3",
}) => {
  const { title, categories, dateTime, location, price, eventId, imageURL, desc } =
    event;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-lg transition-transform transform hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <div className={`block relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}>
        <EventImage event={event} />
      </div> */}
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          {/* <PostFeaturedMedia post={post} isHover={isHover} /> */}
          <EventImage event={event} />
        </div>
      </div>

      <Link href={`/events/${eventId}`} className="absolute inset-0"></Link>

      <div className="p-4 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <EventCategoryBadgeList EventCategorie={categories} />
          <PostCardSaveAction className="relative" />
        </div>

        <h3 className="nc-card-title block text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-2" title={title}>
            {title}
          </span>
        </h3>

        <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-1 8H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z"/>
          </svg>
          <span>{dateTime}</span>
        </div>

        <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center space-x-2">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 24 24"
  stroke="none"
  className="w-6 h-6"
>
<path d="M12 2C8.13 2 5 5.13 5 9c0 6.627 7 13 7 13s7-6.373 7-13c0-3.87-3.13-7-7-7zM12 12c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
</svg>

          <span>{location}</span>
        </div>
{/* 
        <div className="flex items-end justify-between mt-auto">
          {price && (
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              ¥ {price}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Eventcard;
