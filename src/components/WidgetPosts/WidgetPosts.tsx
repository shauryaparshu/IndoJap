import Card3Small from "@/components/Card3Small/Card3Small";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import React, { FC } from "react";
import { Blog } from "@/data/types";

export interface WidgetPostsProps {
  className?: string;
  blogs: Blog[];
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  blogs,
}) => {
  // Sort blogs by date (assuming blogs have a 'date' field)
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Get the latest 3 blogs
  const latestBlogs = sortedBlogs.slice(0, 3);

  return (
    <div className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="🎯 Popular Posts"
        viewAll={{ label: "View all", href: "/blogs" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {latestBlogs.map((post) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.blogId}
            blogs={post}
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
//   blogs: Blog[];
// }

// const WidgetPosts: FC<WidgetPostsProps> = ({
//   className = "bg-neutral-100 dark:bg-neutral-800",
//   blogs,

// }) => {
//   return (
//     <div className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}>
//       <WidgetHeading1
//         title="🎯 Popular Posts"
//         viewAll={{ label: "View all", href: "/blogs" }}
//       />
//       <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
//         {blogs.map((post) => (
//           <Card3Small
//             className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
//             key={post.blogId}
//             blogs={post}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WidgetPosts;
