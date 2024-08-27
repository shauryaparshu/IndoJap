import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/data/types";

export interface Card3SmallProps {
  className?: string;
  events: Event;
}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full",events }) => {
  // const { title, href, featuredImage,readingTime,date} = post;

  return (
    <div
      className={`nc-Card3Small relative flex flex-row justify-between items-center ${className}`}
    >
      <Link href={`/events/${events.eventId}`}  className="absolute inset-0" title={events.title}></Link>
      <div className="relative space-y-2">
        {/* <PostCardMeta meta={{ ...post }} /> */}
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/events/${events.eventId}`}  className="line-clamp-2" title={events.title}>
            {events.title}
          </Link>
        </h2>
        {/* <p>{events.readingTime} · {blogs.createdAt}</p> */}
        <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-1 8H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z"/>
          </svg>
          <span>{events.dateTime}</span>
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

          <span>{events.location}</span>
        </div>

      </div>

      <Link
        href={`/events/${events.eventId}`} 
        title={events.title}
        className={`block w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
          <Image
            alt="featured"
            sizes="100px"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={events.imageURL}
            fill
            title={events.title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3Small;
