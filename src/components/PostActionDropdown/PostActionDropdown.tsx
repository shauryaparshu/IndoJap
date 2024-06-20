"use client";

import React, { FC, useState } from "react";
import { FaLink, FaCommentDots, FaUserSlash, FaFlag } from "react-icons/fa";
import twFocusClass from "@/utils/twFocusClass";
import NcDropDown, { NcDropDownItem } from "@/components/NcDropDown/NcDropDown";
import ModalReportItem from "@/components/ModalReportItem/ModalReportItem";
import ModalHideAuthor from "./ModalHideAuthor";
import { useRouter } from "next/navigation";

export interface PostActionDropdownProps {
  containerClassName?: string;
  iconClass?: string;
  dropdownPositon?: "up" | "down";
}

const PostActionDropdown: FC<PostActionDropdownProps> = ({
  containerClassName = "h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
  iconClass = "h-[18px] w-[18px]",
  dropdownPositon = "down",
}) => {
  let actions: NcDropDownItem[] = [
    {
      id: "copylink",
      name: "Copy link",
      icon: <FaLink className="w-6 h-6" />,
    },
    {
      id: "commentThisArticle",
      name: "Comment this article",
      icon: <FaCommentDots className="w-6 h-6" />,
    },
    {
      id: "hideThisAuthor",
      name: "Hide this author",
      icon: <FaUserSlash className="w-6 h-6" />,
    },
    {
      id: "reportThisArticle",
      name: "Report this article",
      icon: <FaFlag className="w-6 h-6" />,
    },
  ];

  const router = useRouter();
  const [isReporting, setIsReporting] = useState(false);
  const [showModalHideAuthor, setShowModalHideAuthor] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const openModalReportPost = () => setIsReporting(true);
  const closeModalReportPost = () => setIsReporting(false);

  const openModalHideAuthor = () => setShowModalHideAuthor(true);
  const onCloseModalHideAuthor = () => setShowModalHideAuthor(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/single/this-is-slug"
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleClickDropDown = (item: NcDropDownItem) => {
    if (item.id === "copylink") {
      handleCopyLink();
      return;
    }
    if (item.id === "reportThisArticle") {
      return openModalReportPost();
    }
    if (item.id === "hideThisAuthor") {
      return openModalHideAuthor();
    }
    if (item.id === "commentThisArticle") {
      // Handle comment action if needed
      return;
    }
  };

  const renderMenu = () => {
    if (isCopied) {
      actions = actions.map((item) => {
        if (item.id !== "copylink") return item;
        return {
          ...item,
          name: "Link Copied",
        };
      });
    }
    return (
      <NcDropDown
        className={`text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full ${containerClassName} ${twFocusClass()}`}
        triggerIconClass={iconClass}
        data={actions}
        panelMenusClass={
          dropdownPositon === "up" ? "origin-bottom-right bottom-0" : undefined
        }
        onClick={handleClickDropDown}
      />
    );
  };

  return (
    <div>
      {renderMenu()}

      <ModalReportItem
        show={isReporting}
        onCloseModalReportItem={closeModalReportPost}
      />
      <ModalHideAuthor
        show={showModalHideAuthor}
        onCloseModalHideAuthor={onCloseModalHideAuthor}
      />
    </div>
  );
};

export default PostActionDropdown;
