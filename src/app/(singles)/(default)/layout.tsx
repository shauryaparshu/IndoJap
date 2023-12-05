import React, { ReactNode } from "react";
import SingleContent from "../../blogs/SingleContent";
import SingleRelatedPosts from "../../blogs/SingleRelatedPosts";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}

      {/* SINGLE MAIN CONTENT */}
      <div className="container mt-10">
        <SingleContent />
      </div>

      {/* RELATED POSTS */}
      <SingleRelatedPosts />
    </div>
  );
};

export default layout;
