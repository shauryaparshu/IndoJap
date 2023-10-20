import React, { FC } from "react";
import Card8 from "@/components/Card8/Card8";
import { SectionMagazine1Props } from "./SectionMagazine1";
import HeaderFilter from "./HeaderFilter";
import Card9 from "@/components/Card9/Card9";

export interface SectionMagazine4Props extends SectionMagazine1Props {}

const SectionMagazine4: FC<SectionMagazine4Props> = ({
  posts,
  className = "",
  heading = "Latest Articles 🎈",
}) => {
  return (
    <div className={`nc-SectionMagazine4 ${className}`}>
      <HeaderFilter heading={heading} />

      {!posts?.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {posts[0] && <Card8 className="sm:col-span-2" post={posts[0]} />}
        {posts
          .filter((_, i) => i < 3 && i >= 1)
          .map((item, index) => (
            <Card9 key={index} post={item} />
          ))}
        {posts
          .filter((_, i) => i < 5 && i >= 3)
          .map((item, index) => (
            <Card9 key={index} post={item} />
          ))}
        {posts[5] && <Card8 className="sm:col-span-2" post={posts[5]} />}
      </div>
    </div>
  );
};

export default SectionMagazine4;
