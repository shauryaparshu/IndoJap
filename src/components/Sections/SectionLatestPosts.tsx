import React, { FC } from "react";
import Card3 from "@/components/Card3/Card3";
import Heading from "@/components/Heading/Heading";
import { Blog } from "@/data/types";
import SectionAds from "./SectionAds";

export interface SectionLatestPostsProps {
  gridClass?: string;
  className?: string;
  heading?: string;
  blogs: Blog[];
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  heading = "Latest Articles",
  gridClass = "",
  className = "",
  blogs
}) => {
  // Sort blogs by date (assuming blogs have a 'date' field)
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
          <Heading>{heading}</Heading>
          <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
            {sortedBlogs.map((blog: Blog) => (
              <Card3 key={blog.blogId} className="py-0" post={blog} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:w-2/5 xl:ps-0 xl:w-1/3">
          <div className="sticky top-20"> {/* Adjust top-20 based on your design */}
            <SectionAds />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;

// import React, { FC } from "react";
// import Card3 from "@/components/Card3/Card3";
// import Heading from "@/components/Heading/Heading";
// import { Blog } from "@/data/types";
// import SectionAds from "./SectionAds";

// export interface SectionLatestPostsProps {
//   gridClass?: string;
//   className?: string;
//   heading?: string;
//   blogs: Blog[];
// }

// const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
//   heading = "Latest Articles",
//   gridClass = "", 
//   className = "",
//   blogs
// }) => {
//   return (
//     <div className={`nc-SectionLatestPosts relative ${className}`}>
//       <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
//           <Heading>{heading}</Heading>
//           <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
//             {blogs.map((blog: Blog) => (
//               <Card3 key={blog.blogId} className="py-3" post={blog} />
//             ))}
//           </div>
//         </div>
//         <div className="hidden lg:block lg:w-2/5 xl:ps-0 xl:w-1/3">
//           <div className="sticky top-20"> {/* Adjust top-20 based on your design */}
//             <SectionAds />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionLatestPosts;
