import React from "react";
import Head from "next/head";

const Terms: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | IndiaJapanGuide</title>
        <meta name="description" content="Terms of Service for IndiaJapanGuide, outlining the rules and regulations for using our website." />
      </Head>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p>Effective Date: August 1, 2024</p>
        <p>Welcome to IndiaJapanGuide. These terms of service outline the rules and regulations for the use of our website indiajapanguide.com.</p>
        <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>By accessing this website, you accept these terms and conditions in full. Do not continue to use IndiaJapanGuide if you do not accept all of the terms and conditions stated on this page.</p>
        <h2 className="text-2xl font-semibold mt-8">2. Intellectual Property Rights</h2>
        <p>Unless otherwise stated, IndiaJapanGuide and/or its licensors own the intellectual property rights for all material on IndiaJapanGuide. All intellectual property rights are reserved. You may view and/or print pages from https://indiajapanguide.com for your own personal use subject to restrictions set in these terms and conditions.</p>
        <h2 className="text-2xl font-semibold mt-8">3. User Conduct</h2>
        <p>You must not:</p>
        <ul className="list-disc list-inside">
          <li>Republish material from https://indiajapanguide.com</li>
          <li>Sell, rent, or sub-license material from https://indiajapanguide.com</li>
          <li>Reproduce, duplicate, or copy material from https://indiajapanguide.com</li>
          <li>Redistribute content from IndiaJapanGuide (unless content is specifically made for redistribution).</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8">4. Limitation of Liability</h2>
        <p>In no event shall IndiaJapanGuide, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise, and IndiaJapanGuide, including its officers, directors, and employees, shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.</p>
        <h2 className="text-2xl font-semibold mt-8">5. Indemnification</h2>
        <p>You hereby indemnify to the fullest extent IndiaJapanGuide from and against any and all liabilities, costs, demands, causes of action, damages, and expenses (including reasonable attorney’s fees) arising out of or in any way related to your breach of any of the provisions of these terms.</p>
        <h2 className="text-2xl font-semibold mt-8">6. Severability</h2>
        <p>If any provision of these terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.</p>
        <h2 className="text-2xl font-semibold mt-8">7. Variation of Terms</h2>
        <p>IndiaJapanGuide is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review such terms on a regular basis to ensure you understand all terms and conditions governing the use of this website.</p>
        <h2 className="text-2xl font-semibold mt-8">8. Assignment</h2>
        <p>IndiaJapanGuide is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification or consent required. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.</p>
        <h2 className="text-2xl font-semibold mt-8">9. Entire Agreement</h2>
        <p>These terms, including any legal notices and disclaimers contained on this website, constitute the entire agreement between IndiaJapanGuide and you in relation to your use of this website, and supersede all prior agreements and understandings with respect to the same.</p>
        <h2 className="text-2xl font-semibold mt-8">10. Governing Law & Jurisdiction</h2>
        <p>These terms will be governed by and construed in accordance with the laws of [Insert State/Country], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Insert State/Country] for the resolution of any disputes.</p>
        <h2 className="text-2xl font-semibold mt-8">11. Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at: <a href="mailto:indiajapanguide@gmail.com" className="text-sky-600">indiajapanguide@gmail.com</a></p>
      </div>
    </>
  );
};

export default Terms;
