import React, { FC } from "react";
import { TaxonomyType, TwMainColor } from "@/data/types";
import Badge from "@/components/Badge/Badge";
import Link from "next/link";
import Image from "next/image";

export interface CardCategory4Props {
  className?: string;
  taxonomy: TaxonomyType;
  index?: string;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  taxonomy,
  index,
}) => {
  const { count, name, href = "/", thumbnail, color } = taxonomy;
  const getColorClass = () => {
    switch (color) {
      case "pink":
        return "bg-pink-500";
      case "red":
        return "bg-red-500";
      case "gray":
        return "bg-gray-500";
      case "green":
        return "bg-green-500";
      case "purple":
        return "bg-purple-500";
      case "indigo":
        return "bg-indigo-500";
      case "yellow":
        return "bg-yellow-500";
      case "blue":
        return "bg-blue-500";
      default:
        return "bg-pink-500";
    }
  };

  return (
    <Link href={href} className={`nc-CardCategory4 flex flex-col ${className}`}>
      <div className="flex-shrink-0 relative w-full aspect-w-7 aspect-h-5 h-0 rounded-3xl overflow-hidden group">
        <Image
          alt="taxonomies"
          fill
          src={thumbnail || ""}
          className="object-cover w-full h-full rounded-2xl"
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
        />
        <div>
          {index && (
            <Badge
              color={color as TwMainColor}
              name={index}
              className="absolute top-3 start-3"
            />
          )}
        </div>
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>

      <div className="flex items-center mt-5">
        <div className={`w-9 h-9 ${getColorClass()} rounded-full`}></div>
        <div className="ms-4">
          <h2 className="text-base text-neutral-900 dark:text-neutral-100 font-medium">
            {name}
          </h2>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400">
            {count} Articles
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory4;
