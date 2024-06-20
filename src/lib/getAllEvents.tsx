export default async function getAllEvents() {
  const res = await fetch(
    "https://6abuw5509l.execute-api.us-east-1.amazonaws.com/events",
    { next: { revalidate: 10 } }
  );
  if (!res.ok) throw new Error("failed to fetch events");

  return res.json();
}
