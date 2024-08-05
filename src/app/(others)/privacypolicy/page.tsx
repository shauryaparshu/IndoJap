import React from "react";
import Head from "next/head";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | IndiaJapanGuide</title>
        <meta name="description" content="Privacy policy of IndiaJapanGuide, detailing how we handle user data and information." />
      </Head>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p>Effective Date: August 1, 2024</p>
        <p>
          Welcome to IndiaJapanGuide. Your privacy is important to us. This Privacy Policy explains that we do not collect any personal information when you visit our website indiajapanguide.com.
        </p>
        <h2 className="text-2xl font-semibold mt-8">1. Information We Do Not Collect</h2>
        <p>We do not collect any personal data from users. We do not use cookies, and we do not track user behavior on our site.</p>
        <h2 className="text-2xl font-semibold mt-8">2. External Links</h2>
        <p>
          Our website may contain links to other websites. Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
        </p>
        <h2 className="text-2xl font-semibold mt-8">3. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date.</p>
        <h2 className="text-2xl font-semibold mt-8">4. Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:indiajapanguide@gmail.com" className="text-sky-600">indiajapanguide@gmail.com</a>
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
