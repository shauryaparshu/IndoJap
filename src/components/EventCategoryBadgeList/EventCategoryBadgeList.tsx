import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";
import { Event } from "@/data/types";
export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  EventCategorie: Event["categories"];
}

const EventCategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  EventCategorie,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      <Badge name={EventCategorie} />
    </div>
  );
};

export default EventCategoryBadgeList;
