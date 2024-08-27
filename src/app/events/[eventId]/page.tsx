import React from "react";
import getEvent from "@/lib/getEvent";
import { Event } from "@/data/types";
import SingleHeader from "./EventPage";
import NcImage from "@/components/NcImage/NcImage";
import EventContent from "./EventContent";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionUpcommingEvents from "./SectionUpcommingEvents"
import { Sidebar } from "./SideBar";

interface Params {
  params: {
    eventId: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params: { eventId } }: Params) {
  const event = await getEvent(eventId);

  return {
    title: event.title, 
    description: event.description, 
    openGraph: {
      title: event.title,
      description: event.description,
      images: [
        {
          url: event.posterURL, 
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function EventPage({ params: { eventId } }: Params) {
  const event = await getEvent(eventId);

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16">
      <header className="container mx-auto rounded-xl bg-white shadow-md dark:bg-slate-800">
        <div className="max-w-screen-md mx-auto px-6 py-8 lg:py-12">
          <SingleHeader event={event} />
        </div>
      </header>

     


      <div className={`relative`}>
        
      <div className="container flex flex-col my-10 lg:flex-row ">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
             {/* POSTER IMAGE */}
      <div className="container mx-auto my-10 sm:my-12">
        <div className="max-w-screen-md mx-auto">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
            <NcImage
              alt="poster"
              className="object-cover w-full h-auto"
              src={event.posterURL}
              width={912}
              height={1280}
              sizes="(max-width: 1024px) 100vw, 1280px"
            />
          </div>
        </div>
      </div>
            <EventContent event={event} />
          </div>
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
