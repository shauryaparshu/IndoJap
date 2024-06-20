import React from "react";
import getEvent from "@/lib/getEvent";
import { Event } from "@/data/types";
import SingleHeader from "./EventPage";
import NcImage from "@/components/NcImage/NcImage";
// import SingleContentDemo from "@/app/(singles)/SingleContentDemo";
// import SingleContent from "@/app/blogs/SingleContent";
import EventContent from "./EventContent";

interface Params {
  params: Event;
}

export const revalidate = 0;
export default async function EventPage({ params: { eventId } }: Params) {
  const eventData: Promise<Event> = getEvent(eventId);

  const event = await eventData;

  // console.log(event);

  return (
    <>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SingleHeader event={event} />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        <NcImage
          alt="single"
          containerClassName="container my-10 sm:my-12"
          className="w-full rounded-xl"
          src={event.imageURL}
          width={1260}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
        <div className="container mt-10">
          {/* <SingleContentDemo /> */}
          {/* <SingleContent /> */}
          <EventContent event={event} />
        </div>
      </div>
    </>
  );
}
