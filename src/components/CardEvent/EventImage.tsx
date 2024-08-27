"use client";

import React, { FC } from "react";
import { Event } from "@/data/types";
import Link from "next/link";
import Image from "next/image";

export interface EventImageProps {
  className?: string;
  event: Event;
}

const EventImage: FC<EventImageProps> = ({
  className = "w-full h-full",
  event,
}) => {
  const { imageURL, eventId } = event;
  const defaultURL =
    "https://dev-indojap-site-imageuploadsbucketc6e2667e-tz5tcenzwzys.s3.amazonaws.com/1077596-200.png";

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      <Image
        alt={event.title || "Event Image"}
        fill
        className="object-cover"
        src={imageURL || defaultURL}
        sizes="(max-width: 600px) 480px, 800px"
      />
      <Link
        href={`/events/${eventId}`}
        className="block absolute inset-0 bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
      />
    </div>
  );
};

export default EventImage;
