"use client";

import React, { FC } from "react";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/components/Navigation/Navigation";
import SearchModal from "./SearchModal";
import NotifyDropdown from "./NotifyDropdown";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
import Button from "../Button/Button";

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <Navigation />
        </div>

     {/* Before login  */}
        <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center lg:flex">
              <SwitchDarkMode />
              <SearchModal />
              <div className="px-1"></div>
              <Button
                sizeClass="py-3 px-4 sm:px-6"
                href="/login"
                pattern="primary"
              >
                Sign up
              </Button>
            </div>
            <div className="flex items-center lg:hidden">
              <SwitchDarkMode />
              <SearchModal />
            </div>
          </div>
        {/* After login update in future */}
        {/* <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          <SearchModal />
          <NotifyDropdown />
          <AvatarDropdown />
        </div> */}

      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
