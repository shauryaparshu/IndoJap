import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import IJGLogo from "@/images/indiajap-logo.png";
import Link from "next/link";
import LogoSvg from "./LogoSvg";
import Image, { StaticImageData } from "next/image";

export interface LogoProps {
  img?: string | StaticImageData;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = IJGLogo,
  imgLight = logoLightImg,
}) => {
  return (
    <Link
      href="/"
      className="ttnc-logo inline-block text-primary-6000 flex-shrink-0"
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLEASE DELETE THIS CODE AND USE YOUR IMAGE PNG BY BELOW CODE */}
     {/* <LogoSvg/> */}
     <Image className="mx-auto w-16 h-auto" src={IJGLogo} alt="India-Japan-Guide" />
     {/* <img
              src={IJGLogo}
              alt="IJG Logo"
              className="mx-auto w-1/2 h-auto" // Adjust the width as needed
            /> */}
      {/* <img src="https://dev-indojap-site-imageuploadsbucketc6e2667e-tz5tcenzwzys.s3.amazonaws.com/IJG-logo.png"alt="IJG Logo" /> */}
    </Link>
  );
};

export default Logo;
