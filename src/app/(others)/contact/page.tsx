"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Textarea from "@/components/Textarea/Textarea";
import Heading2 from "@/components/Heading/Heading2";

const info = [
  {
    title: "🗺 INDIA JAPAN GUIDE",
    desc: "Reach out to us for any inquiries, collaborations, or feedback—we're here to connect with you!",
  },
  {
    title: "💌 EMAIL",
    desc: "indiajapanguide@gmail.com",
  },
];

const PageContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.status === 200) {
      setStatus({ message: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus({ message: 'Error sending message.', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <div>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-28 ">
        <Heading2>Contact us</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Drop a message and get in touch with us.
        </span>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="max-w-sm space-y-6">
          {info.map((item, index) => (
            <div key={index}>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                {item.title}
              </h3>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
        <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
        {status ? (
          <div className="text-green-500 font-bold"> 😃 Message submitted successfully!</div>
        ):(<div>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <Label>Full name</Label>
              <Input
                name="name"
                placeholder="Example Doe"
                type="text"
                className="mt-1"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
            <label className="block">
              <Label>Email address</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
            <label className="block">
              <Label>Message</Label>
              <Textarea
                name="message"
                className="mt-1"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </ButtonPrimary>
          </form>
          {/* {status && (
            <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {status.message}
            </p>
          )} */}
        </div>)}
        
      </div>
    </div>
  );
};

export default PageContact;


// import React, { FC } from "react";
// import ButtonPrimary from "@/components/Button/ButtonPrimary";
// import Input from "@/components/Input/Input";
// import Label from "@/components/Label/Label";
// import SocialsList from "@/components/SocialsList/SocialsList";
// import Textarea from "@/components/Textarea/Textarea";
// import Heading2 from "@/components/Heading/Heading2";

// const info = [
//   {
//     title: "🗺 INDIA JAPAN GUIDE",
//     desc: "Reach out to us for any inquiries, collaborations, or feedback—we're here to connect with you!",
//   },
//   {
//     title: "💌 EMAIL",
//     desc: "indiajapanguide@gmail.com",
//   },
//   // {
//   //   title: "☎ PHONE",
//   //   desc: "000-123-456-7890",
//   // },
// ];

// const PageContact = ({}) => {
//   return (
//     <div>
//       <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-28 ">
//         <Heading2>Contact us</Heading2>
//         <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
//           Drop us message and we will get back for you.
//         </span>
//       </header>

//       <div className="grid gap-8 lg:grid-cols-2">
//         <div className="max-w-sm space-y-6">
//           {info.map((item, index) => (
//             <div key={index}>
//               <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
//                 {item.title}
//               </h3>
//               <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
//                 {item.desc}
//               </span>
//             </div>
//           ))}
//           {/* <div>
//             <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
//               🌏 SOCIALS
//             </h3>
//             <SocialsList className="mt-2" />
//           </div> */}
//         </div>
//         <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
//         <div>
//           <form className="grid grid-cols-1 gap-6" action="#" method="post">
//             <label className="block">
//               <Label>Full name</Label>

//               <Input placeholder="Example Doe" type="text" className="mt-1" />
//             </label>
//             <label className="block">
//               <Label>Email address</Label>

//               <Input
//                 type="email"
//                 placeholder="example@example.com"
//                 className="mt-1"
//               />
//             </label>
//             <label className="block">
//               <Label>Message</Label>

//               <Textarea className="mt-1" rows={6} />
//             </label>
//             <ButtonPrimary type="submit">Send Message</ButtonPrimary>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageContact;
