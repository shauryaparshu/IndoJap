import "./globals.css";
import "@/styles/index.scss";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import SiteHeader from "./SiteHeader";
import AdSense from "@/components/Sections/AdSense";

export const metadata = {
  title: "IndiaJapanGuide",
  description:
    "Explore a world of Indian culture, traditions, and experiences right here in Japan!",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <AdSense pid="ca-pub-7913230536929786"/>
      </head>
      <body className="">
        <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
          <SiteHeader />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
