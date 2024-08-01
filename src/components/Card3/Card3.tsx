import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { Blog } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import EventCategoryBadgeList from "../EventCategoryBadgeList/EventCategoryBadgeList";

export interface Card3Props {
  className?: string;
  post: Blog;
}

const Card3: FC<Card3Props> = ({ className = "h-full", post }) => {
  const {
    blogId,
    title,
    imageURL,
    readingTime,
    createdAt,
    content,
    category,
  } = post;

  return (
    <div
      className={`nc-Card3 relative flex flex-row items-center group ${className}`}
      
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-3.5">
        <EventCategoryBadgeList EventCategorie={category} />
        
        <Link href={`/blogs/${blogId}`} className="block">
            <h2
              className={`nc-card-title block font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base xl:text-lg`}
            >
              <span className="line-clamp-2" title={title}>
                {title}
              </span>
            </h2>
            {/* <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
                {content.slice(0, 100)}...
              </span>
            </div> */}
          </Link>
        </div>
        <div className="mt-5 flex items-center flex-wrap justify-between">
          <p>
            {readingTime} · {createdAt}
          </p>
          <PostCardSaveAction/>
        </div>
      </div>

      <div
        className={`block flex-shrink-0 w-24 sm:w-36 md:w-44 xl:w-56 ms-3 sm:ms-6 rounded-3xl overflow-hidden z-0 mb-5 sm:mb-0`}
      >
  
        <Link href={`/blogs/${blogId}`} className="block w-full h-0 aspect-h-1 aspect-w-1 relative">
          <NcImage
            containerClassName="absolute inset-0"
            src={imageURL}
            fill
            alt={title}
          />
          <span>
            <PostTypeFeaturedIcon
              className="absolute left-2 bottom-2"
              postType={"standard"}
              wrapSize="w-8 h-8"
              iconSize="w-4 h-4"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card3;


// import React, { FC } from "react";
// import NcImage from "@/components/NcImage/NcImage";
// import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
// import { Blog } from "@/data/types";
// import EventCategoryBadgeList from "../EventCategoryBadgeList/EventCategoryBadgeList";
// import Link from "next/link";
// import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";

// export interface Card3Props {
//   className?: string;
//   post: Blog;
// }

// const Card3: FC<Card3Props> = ({ className = "h-full", post }) => {
//   const {
//     blogId,
//     title,
//     imageURL,
//     readingTime,
//     createdAt,
//     content,
//     category,
//   } = post;

//   return (
//     <div
//       className={`nc-Card3 relative flex flex-row items-center group ${className} border border-neutral-200 dark:border-neutral-700 rounded-3xl`} // Add border and rounded-3xl
//     >
//       <div className="flex flex-col px-3 flex-grow">
//         <div className="space-y-3.5">
//           <EventCategoryBadgeList EventCategorie={category} />
          
//           <Link href={`/blogs/${blogId}`} className="block">
//             <h2
//               className={`nc-card-title block font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base xl:text-lg`}
//             >
//               <span className="line-clamp-2" title={title}>
//                 {title}
//               </span>
//             </h2>
//           </Link>
//         </div>
//         <div className="mt-5 flex items-center flex-wrap justify-between">
//           <p>
//             {readingTime} · {createdAt}
//           </p>
//           <PostCardSaveAction />
//         </div>
//       </div>

//       <div
//         className={`block flex-shrink-0 w-24 sm:w-36 md:w-44 xl:w-56 ms-3 sm:ms-6 rounded-3xl overflow-hidden z-0 mb-5 sm:mb-0`}
//       >
//         <Link href={`/blogs/${blogId}`} className="block w-full h-0 aspect-h-1 aspect-w-1 relative">
//           <NcImage
//             containerClassName="absolute inset-0"
//             src={imageURL}
//             fill
//             alt={title}
//           />
//           <span>
//             <PostTypeFeaturedIcon
//               className="absolute left-2 bottom-2"
//               postType={"standard"}
//               wrapSize="w-8 h-8"
//               iconSize="w-4 h-4"
//             />
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card3;
