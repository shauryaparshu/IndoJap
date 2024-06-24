export default async function getEvent(eventId: string) {
  try {
    const res = await fetch(
      `https://g6kl4aeeb0.execute-api.us-east-1.amazonaws.com/events/${eventId}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch Event. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch Event. Please try again later.");
  }
}
