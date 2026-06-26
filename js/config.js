/**
 * Site configuration — update these values as your business details are confirmed.
 */
const SITE_CONFIG = {
  name: "APEX HUT",
  address: {
    en: "Shop S01, G/F, Ping On House, Wo Lok Estate, 60 Yuet Wah Street, Kwun Tong, Kowloon",
    zh: "九龍觀塘月華街60號\n和樂邨平安樓地下S01舖",
  },
  lat: 22.31646,
  lng: 114.2276,
  zoom: 17,

  // Map provider — "openstreetmap" needs no API key; switch to "google" when you have a key
  mapProvider: "openstreetmap",

  // Google Maps (optional — uncomment when you have an API key or embed URL)
  // googleMapsApiKey: "",
  // googleMapsEmbedUrl: "", // from Google Maps: Share → Embed a map → copy iframe src

  directions: {
    en: "MTR Kwun Tong Station. Follow Yuet Wah Street to Wo Lok Estate, Ping On House (Shop S01, ground floor).",
    zh: "港鐵觀塘站，沿月華街前往和樂邨平安樓地下S01舖。",
  },

  // Contact — leave blank to show "coming soon"
  phone: "", // e.g. "+852 1234 5678"
  whatsapp: "", // digits only with country code, e.g. "85212345678"
  email: "", // e.g. "hello@apexhut.hk"

  // Opening hours — edit times or set `enabled: false` on a row to hide it
  hours: [
    { day: { en: "Mon – Sat", zh: "星期一至六" }, time: { en: "12:00 – 20:00", zh: "12:00 – 20:00" }, enabled: true },
    { day: { en: "Sun & public holidays", zh: "星期日及公眾假期" }, time: { en: "Closed", zh: "休息" }, enabled: true },
  ],
  hoursNote: {
    en: "Hours may change on public holidays. Please contact us to confirm.",
    zh: "公眾假期營業時間或有調整，歡迎先聯絡我們確認。",
  },

  // Custom domain for GitHub Pages — also update the CNAME file in the project root
  customDomain: "apexhuthk.com",
};
