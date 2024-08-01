import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/data/types";

export interface Card3SmallProps {
  className?: string;
  blogs: Blog;
}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full",blogs }) => {
  // const { title, href, featuredImage,readingTime,date} = post;

  return (
    <div
      className={`nc-Card3Small relative flex flex-row justify-between items-center ${className}`}
    >
      <Link href={`/blogs/${blogs.blogId}`}  className="absolute inset-0" title={blogs.title}></Link>
      <div className="relative space-y-2">
        {/* <PostCardMeta meta={{ ...post }} /> */}
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/blogs/${blogs.blogId}`}  className="line-clamp-2" title={blogs.title}>
            {blogs.title}
          </Link>
        </h2>
        <p>{blogs.readingTime} · {blogs.createdAt}</p>

      </div>

      <Link
        href={`/blogs/${blogs.blogId}`} 
        title={blogs.title}
        className={`block w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
          <Image
            alt="featured"
            sizes="100px"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={blogs.imageURL}
            fill
            title={blogs.title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3Small;
