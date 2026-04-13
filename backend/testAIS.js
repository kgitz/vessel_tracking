// const axios = require("axios");

// async function getToken() {
//   try {
//     const res = await axios.post(
//       "https://id.barentswatch.no/connect/token",
//       new URLSearchParams({
//         client_id: "gvkale01@gmail.com: Vessel Tracker",
//         client_secret: "28541",
//         scope: "ais",
//         grant_type: "client_credentials"
//       }),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         }
//       }
//     );

//     console.log("✅ TOKEN:", res.data.access_token);
//   } catch (err) {
//     console.error("❌ ERROR:", err.response?.data || err.message);
//   }
// }

// getToken();