export default async function getEvent(eventId: string) {
    try {
      const res = await fetch(
        `https://g6kl4aeeb0.execute-api.us-east-1.amazonaws.com/blogs/${eventId}`
      );
  
      if (!res.ok) {
        throw new Error(`Failed to fetch Blog. Status: ${res.status}`);
      }
  
      return res.json();
    } catch (error) {
      console.error("Error fetching Blog:", error);
      throw new Error("Failed to fetch Blog. Please try again later.");
    }
  }
  