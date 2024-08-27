import { Suspense } from 'react';
import ModalCategories from "./ModalCategories";
import { Event, TaxonomyType } from "@/data/types";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import Eventcard from "@/components/CardEvent/Eventcard";
import Image from "next/image";
import LoadingPost from "@/components/LoadingPost/LoadingPost";
import Heading from "@/components/Heading/Heading";
import moment from 'moment';
import getAllEvents from '@/lib/getAllEvents';

type PageArchiveProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PageArchive({ searchParams }: PageArchiveProps) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  const allEvents = await getAllEvents();

  const events = category
    ? allEvents.Items.filter((event: Event) => event.categories.includes(category))
    : allEvents.Items;

  const currentDateTime = moment();

  // Sorting events by date and time in ascending order (oldest first)
  const sortEventsByDateAsc = (events: Event[]) =>
    events.sort((a, b) =>
      moment(a.dateTime, 'ddd, MMM D • h:mm A').unix() - moment(b.dateTime, 'ddd, MMM D • h:mm A').unix()
    );

  // Sorting events by date and time in descending order (newest first)
  const sortEventsByDateDesc = (events: Event[]) =>
    events.sort((a, b) =>
      moment(b.dateTime, 'ddd, MMM D • h:mm A').unix() - moment(a.dateTime, 'ddd, MMM D • h:mm A').unix()
    );

  const pastEvents = sortEventsByDateDesc(
    events.filter((event: { dateTime: moment.MomentInput; }) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isBefore(currentDateTime)
    )
  );

  const todayEvents = sortEventsByDateAsc(
    events.filter((event: { dateTime: moment.MomentInput; }) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isSame(currentDateTime, 'day')
    )
  );

  const upcomingEvents = sortEventsByDateAsc(
    events.filter((event: { dateTime: moment.MomentInput; }) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isAfter(currentDateTime)
    )
  );

  return (
    <div className="nc-PageArchive">
      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto pt-2">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
          <Image
            alt="archive"
            fill
            src="https://www.pcclean.io/wp-content/gallery/mount-fuji-hd-wallpapers/Mount-Fuji-21.jpg"
            className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              Events
            </h2>
            <span className="block mt-4 text-neutral-300">
              {events.length} Events
            </span>
          </div>
        </div>
      </div>

      <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        {/* Event Sections */}
        <div>
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              <Heading desc="Join the most exciting events in Japan hosted by the Indian community.">Events </Heading>
            </div>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ModalCategories 
                categories={DEMO_CATEGORIES}
                selectedCategory={category}
              />
            </div>
          </div>

          <Suspense fallback={<LoadingPost />}>
            {todayEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Today's Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4">
                  {todayEvents.map((event: Event) => (
                    <Eventcard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            )}

            {upcomingEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Upcoming Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4">
                  {upcomingEvents.map((event: Event) => (
                    <Eventcard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            )}

            {pastEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Past Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4">
                  {pastEvents.map((event: Event) => (
                    <Eventcard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
