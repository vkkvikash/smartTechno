const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
    runtimeCaching,
  },
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phplaravel-850897-2935237.cloudwaysapps.com",
        port: "",
        pathname: "public/upload/brands/original/**",
      },
    ],
  },
});

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "phplaravel-850897-2935237.cloudwaysapps.com",
//         port: "",
//         pathname: "public/upload/brands/original/**",
//       },
//     ],
//   },
// };
