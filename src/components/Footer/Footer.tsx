import React from "react";
import Logo from "@/components/Logo/Logo";
import SocialsList1 from "@/components/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/", label: "Installation" },
      { href: "/", label: "Release Notes" },
      { href: "/", label: "Upgrade Guide" },
      { href: "/", label: "Browser Support" },
      { href: "/", label: "Editor Support" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/", label: "Design features" },
      { href: "/", label: "Prototyping" },
      { href: "/", label: "Design systems" },
      { href: "/", label: "Pricing" },
      { href: "/", label: "Customers" },
    ],
  }
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* music player */}
      <MusicPlayer />

      {/* footer */}
      {/* <div className="nc-Footer relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>

          </div>
          
          {widgetMenus.map(renderWidgetMenuItem)}
          <div>
          <h2 className="text-2xl font-bold mb-4">IndoJap</h2>
          <p className="text-sm">Address Line 1, Address Line 2</p>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Phone: +1 123-456-7890</p>
        </div>
        </div>
        
        <div className="mt-4 text-center pt-10">
        <p className="text-sm">&copy; 2023 IndoJap. All rights reserved.</p>
      </div>
      </div> */}

<div className="nc-Footer relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
  <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
    {/* Logo and Socials */}
    <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
      <div className="col-span-2 md:col-span-1">
        <Logo />
      </div>

      <div className="col-span-2 flex items-center md:col-span-3">
        <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
      </div>
    </div>

    {/* Widget Menus */}
    {widgetMenus.map(renderWidgetMenuItem)}

    {/* Contact Information */}
    <div className="col-span-2 lg:col-span-1">
      <div>
        <h2 className="text-2xl font-bold mb-4">IndoJap</h2>
        <p className="text-sm">Address Line 1, Address Line 2</p>
        <p className="text-sm">Email: info@example.com</p>
        <p className="text-sm">Phone: +1 123-456-7890</p>
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-4 text-center pt-10">
    <p className="text-sm">&copy; 2023 IndoJap. All rights reserved.</p>
  </div>
</div>

    </>
  );
};

export default Footer;