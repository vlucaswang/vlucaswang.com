export const SITE = {
  website: "https://www.vlucaswang.com/",
  author: "Lucas Wang",
  profile: "https://github.com/vlucaswang",
  desc: "Senior Platform Engineer with 13 years of experience building secure, scalable production systems.",
  title: "Lucas Wang",
  ogImage: "devosfera-og.webp",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showGalleries: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit this page",
    url: "https://github.com/vlucaswang/www.vlucaswang.com/edit/main/",
  },
  dynamicOgImage: false,
  dir: "ltr", // "rtl" | "auto"
  lang: "en",
  timezone: "Australia/Adelaide",
  introAudio: {
    enabled: false,
    src: "/audio/intro-web.mp3",
    label: "INTRO.MP3",
    duration: 30,
  },
} as const;
