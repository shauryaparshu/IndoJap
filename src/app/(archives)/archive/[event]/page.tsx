import Image from "next/image";
import Link from "next/link";

const event = [
  {
    id: 1,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:"dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, aperiam ullam? Illo reprehenderit velit repudiandae quasi alias unde excepturi ut vero natus minus officiis, sint dolorem cumque nulla exercitationem accusantium!",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 2,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 3,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 4,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 5,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 6,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 7,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 8,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 9,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 10,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 11,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 12,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 13,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 14,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 15,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 16,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 17,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
  {
    id: 18,
    eventImg:
      "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Diwali",
    description:
      "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: "12th Nov",
    venue: "Shibuya City",
  },
];

export default function Events() {
  return (
    <div className="p-6">
      <Header />
      <div className="flex align-middle justify-center flex-wrap">
        <Event />
      </div>
    </div>
  );
}

function Header() {
  const eventsNum = event.length;
  return (
    <>
      {/* HEADER */}
      <div className="w-full xl:max-w-screen-2xl mx-auto mb-10">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
          <Image
            alt="archive"
            fill
            src="https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              Events
            </h2>
            <span className="block mt-4 text-neutral-300">
              {eventsNum} Events
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Event() {
  return (
    <>
      {event.map((each) => (
        <div
          key={each.id}
          className="flex max-w-sm bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl m-4 p-4"
        >
          <div className="mr-4 w-2/3 flex items-center justify-center">
            <Image
              src={each.eventImg}
              className="rounded-lg"
              alt="diwali"
              width={400}
              height={400}
            />
          </div>
          <div className="w-40 h-56">
            <h1 className="text-center text-2xl mb-2 font-sans font-semibold">
              {each.title}
            </h1>
            <p className="text-xs line-clamp-6">{each.description}</p>
            <div className="mt-4 flex gap-2 items-center justify-center">
              <span className="text-2xl">⛩️</span>
              <span className="font-semibold text-xs">{each.venue}</span>
              <span className="text-2xl">📅</span>
              <span className="font-semibold text-xs">{each.date}</span>
            </div>
            <div className="text-xs text-center mt-6">
              <Link href="/" className="bg-blue-700 text-white p-1 rounded-xl">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
