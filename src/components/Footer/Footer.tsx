import React from "react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <div className="nc-Footer relative py-12 lg:py-20 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container max-w-4xl mx-auto px-4 lg:px-8">
          {/* Logo */}
          <div className="mb-8 lg:mb-12 text-center">
            <img
              src="https://dev-indojap-site-imageuploadsbucketc6e2667e-tz5tcenzwzys.s3.amazonaws.com/Full-indojap-logo.png"
              alt="IJG Logo"
              className="mx-auto w-48 h-auto lg:w-80" // Adjust the width as needed
            />
          </div>

          {/* Essential Links */}
          <div className="mb-8 lg:mb-12 text-center">
            <ul className="flex flex-wrap justify-center space-x-6 lg:flex-nowrap lg:justify-center lg:space-x-12">
              <li>
                <a href="/" className="text-sm hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacypolicy" className="text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-10 text-center">
            <p className="text-sm lg:text-base">
              &copy; 2023 IndiaJapanGuide. All rights reserved.
            </p>
          </div>

          {/* Music Player */}
          <div className="mt-8 lg:mt-12 text-center">
            <MusicPlayer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;