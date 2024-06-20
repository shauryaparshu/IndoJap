import { Event } from "@/data/types";
import { useState, useEffect, useMemo } from "react";

const useDataFetching = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const memoizedEvents = useMemo(() => events, [events]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ds5zfg6g10.execute-api.us-east-1.amazonaws.com/events",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(data.Items);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    };

    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched]);

  return { loading, events: memoizedEvents };
};

export default useDataFetching;
// const useDataFetching = () => {
//   const [loading, setLoading] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [dataFetched, setDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/events/", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setEvents(data.Items);
//         } else {
//           throw new Error("Network response was not ok");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//         setDataFetched(true);
//       }
//     };

//     if (!dataFetched) {
//       fetchData();
//     }
//   }, [dataFetched]);

//   return { loading, events, refetchData: setDataFetched };
// };

// export default useDataFetching;
