"use client";

import React, { FC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLink,
} from "react-icons/fa";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import NcDropDown from "@/components/NcDropDown/NcDropDown";
import NcBookmark from "@/components/NcBookmark/NcBookmark";
import PostActionDropdown from "@/components/PostActionDropdown/PostActionDropdown";

export interface SingleMetaAction2Props {
  className?: string;
}

const SingleMetaAction2: FC<SingleMetaAction2Props> = ({ className = "" }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => alert("Link copied to clipboard!"),
      (err) => alert("Failed to copy the link.")
    );
  };

  const shareItems = [
    {
      id: "facebook",
      name: "Facebook",
      icon: (
        <FacebookShareButton
          url={shareUrl}
          className="w-full h-full flex items-center justify-center"
        >
          <FaFacebook className="text-blue-600" />
          <span className="ml-2">Facebook</span>
        </FacebookShareButton>
      ),
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: (
        <TwitterShareButton
          url={shareUrl}
          className="w-full h-full flex items-center justify-center"
        >
          <FaTwitter className="text-blue-400" />
          <span className="ml-2">Twitter</span>
        </TwitterShareButton>
      ),
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: (
        <WhatsappShareButton
          url={shareUrl}
          className="w-full h-full flex items-center justify-center"
        >
          <FaWhatsapp className="text-green-500" />
          <span className="ml-2">WhatsApp</span>
        </WhatsappShareButton>
      ),
    },
    {
      id: "copyLink",
      name: "Copy Link",
      icon: (
        <div
          onClick={copyToClipboard}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <FaLink className="text-gray-600" />
          <span className="ml-2">Copy Link</span>
        </div>
      ),
    },
  ];

  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 rtl:space-x-reverse items-center">
        <PostCardLikeAndComment
          itemClass="px-4 h-9 text-sm"
          // hiddenCommentOnMobile
          useOnSinglePage
          className="!space-x-2.5 rtl:!space-x-reverse"
        />
        {/* <div className="px-1">
          <div className="border-s border-neutral-200 dark:border-neutral-700 h-6" />
        </div> */}

        <NcBookmark containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" />
        <NcDropDown
          className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
          renderTrigger={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          )}
          data={shareItems}
          renderItem={(item) => (
            <div className="w-full h-full flex items-center justify-center py-2">
              {item.icon}
            </div>
          )}
          onClick={(item) => {
            console.log("Clicked item:", item);
          }}
        />
        <PostActionDropdown
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          iconClass="h-5 w-5"
        />
      </div>
    </div>
  );
};

export default SingleMetaAction2;
