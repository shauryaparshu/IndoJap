import React, { Suspense } from "react";
import SectionHero from "@/components/SectionHero/SectionHero";
import rightImg from "@/images/indojap_logo.png";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import LoadingPost from "@/components/LoadingPost/LoadingPost";
import Eventcard from "@/components/CardEvent/Eventcard";
import getAllEvents from "@/lib/getAllEvents";
import { Event } from "@/data/types";
import getAllBlogs from "@/lib/getAllBlogs";
import AdBanner from "@/components/Sections/AdBanner";
import moment from 'moment';
import Heading from "@/components/Heading/Heading";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";

export const revalidate = 0;

const PageHomeDemo3: React.FC = async () => {
  const eventData = await getAllEvents();
  const allEvents = eventData.Items;

  const blogData = await getAllBlogs();
  const blogs = blogData.Items.slice(0, 4); // Limit to 4 blogs

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
    allEvents.filter((event: Event) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isBefore(currentDateTime)
    )
  );

  const todayEvents = sortEventsByDateAsc(
    allEvents.filter((event: Event) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isSame(currentDateTime, 'day')
    )
  );

  const upcomingEvents = sortEventsByDateAsc(
    allEvents.filter((event: Event) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isAfter(currentDateTime)
    )
  );

  // Limit the number of events displayed
  const limitedPastEvents = pastEvents.slice(0, 4);
  const limitedTodayEvents = todayEvents.slice(0, 4);
  const limitedUpcomingEvents = upcomingEvents.slice(0, 4);

  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        {/* Hero Section */}
        <SectionHero
          rightImg={rightImg}
          heading={
            <span>
              Discover Vibrant Indian Events in
              <span className="relative pr-3">
                <span className="relative"> Japan</span>
              </span>
            </span>
          }
          btnText="Explore Events"
          subHeading="Join the Celebration: Explore a world of Indian culture, traditions, and experiences right here in Japan!"
        />

        {/* Events Section */}
        <div>
          <br />
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <Heading desc="Join the most exciting events in Japan hosted by the Indian community.">
              Events
            </Heading>
          </div>

          <Suspense fallback={<LoadingPost />}>
            {/* Today's Events */}
            {limitedTodayEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Today's Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4">
                  {limitedTodayEvents.map((event: Event) => (
                    <Eventcard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {limitedUpcomingEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Upcoming Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4">
                  {limitedUpcomingEvents.map((event: Event) => (
                    <Eventcard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {/* {limitedPastEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Past Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4">
                  {limitedPastEvents.map((event: Event) => (
                    <Eventcard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            )} */}
          </Suspense>

          {/* Show more events button */}
          <div className="flex justify-center mt-8">
            <ButtonPrimary href="/events">Show more events </ButtonPrimary>
          </div>
        </div>
        <br />

        <div className="relative py-16">
          <BackgroundSection />
          
          <SectionLatestPosts blogs={blogs} className="pb-16 lg:pb-28" />
          <div className="flex justify-center mt-8">
            <ButtonPrimary href="/blogs">Show more blogs</ButtonPrimary>
          </div>
        </div>

        <div className="mb-5">
          <AdBanner dataAdSlot="1366850428" dataAdFormat="auto" dataFullWidthResponsive={true} />
          </div>
      </div>
    </div>
  );
};

export default PageHomeDemo3;

