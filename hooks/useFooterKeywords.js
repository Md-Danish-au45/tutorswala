// "use client"; // Add this line

// import { useEffect, useState } from "react";

// export default function useFooterKeywords() {
//   const [delhiKeywords, setDelhiKeywords] = useState([]);
//   const [ncrKeywords, setNcrKeywords] = useState([]);

//   useEffect(() => {
//     const fetchKeywords = async () => {
//       try {
//         const res = await fetch(
//           "https://tutorwalabackend.onrender.com/api/articles/blog"
//         );
//         const data = await res.json();
//         console.log(res, "dasdas dasj djkas ");
//         // const delhi = data.filter((item) =>
//         //   ["Delhi Areas", "Home Tutors"].includes(item.category)
//         // );

//         // const ncr = data.filter((item) =>
//         //   ["NCR & Nearby Areas", "Online Tutors"].includes(item.category)
//         // );
//         const delhi = data.filter(
//           (item) =>
//             item.title?.includes("Delhi") || item.title?.includes("Karol Bagh")
//         );
//         const ncr = data.filter(
//           (item) =>
//             item.title?.includes("Noida") || item.title?.includes("Gurgaon")
//         );

//         setDelhiKeywords(delhi);
//         setNcrKeywords(ncr);
//       } catch (error) {
//         console.error("Error fetching footer keywords:", error);
//       }
//     };

//     fetchKeywords();
//   }, []);

//   return { delhiKeywords, ncrKeywords };
// }
"use client";

import { useEffect, useState } from "react";

export default function useFooterKeywords() {
  const [delhiKeywords, setDelhiKeywords] = useState([]);
  const [ncrKeywords, setNcrKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await fetch(
          "https://tutorwalabackend.onrender.com/api/articles/blog"
        );
        const data = await res.json();

        // ✅ No filtering, just split all items into two sections
        const half = Math.ceil(data.length / 2);
        const delhi = data.slice(0, half);
        const ncr = data.slice(half);

        setDelhiKeywords(delhi);
        setNcrKeywords(ncr);
      } catch (error) {
        console.error("Error fetching footer keywords:", error);
      }
    };

    fetchKeywords();
  }, []);

  return { delhiKeywords, ncrKeywords };
}
