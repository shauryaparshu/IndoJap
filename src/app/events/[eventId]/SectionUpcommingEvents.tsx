import Card3SmallEvents from "@/components/Card3SmallEvent/Card3SmallEvents";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import React, { FC } from "react";
import { Event } from "@/data/types";
import moment from "moment";

export interface WidgetPostsProps {
  className?: string;
  events: Event[];
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  events,
}) => {
    const currentDateTime = moment();
    const sortEventsByDateAsc = (events: Event[]) =>
        events.sort((a, b) =>
          moment(a.dateTime, 'ddd, MMM D • h:mm A').unix() - moment(b.dateTime, 'ddd, MMM D • h:mm A').unix()
        );
  // Sort events by date (assuming events have a 'date' field)
  const upcomingEvents = sortEventsByDateAsc(
    events.filter((event: Event) =>
      moment(event.dateTime, 'ddd, MMM D • h:mm A').isAfter(currentDateTime)
    )
  );
//   const sortedevents = [...events].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Get the latest 3 events
  const latestevents = upcomingEvents.slice(0, 3);

  return (
    <div className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="🌟 Upcomming Events"
        viewAll={{ label: "View all", href: "/events" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {latestevents.map((post) => (
          <Card3SmallEvents
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.eventId}
            events={post}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;

// import Card3Small from "@/components/Card3Small/Card3Small";
// import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
// import { DEMO_POSTS } from "@/data/posts";
// import { PostDataType } from "@/data/types";
// import React, { FC } from "react";
// import { Blog } from "@/data/types";


// export interface WidgetPostsProps {
//   className?: string;
//   events: Blog[];
// }

// const WidgetPosts: FC<WidgetPostsProps> = ({
//   className = "bg-neutral-100 dark:bg-neutral-800",
//   events,

// }) => {
//   return (
//     <div className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}>
//       <WidgetHeading1
//         title="🎯 Popular Posts"
//         viewAll={{ label: "View all", href: "/events" }}
//       />
//       <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
//         {events.map((post) => (
//           <Card3Small
//             className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
//             key={post.blogId}
//             events={post}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WidgetPosts;
