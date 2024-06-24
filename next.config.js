/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true, // Keep if needed
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pcclean.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "dev-indojap-site-imageuploadsbucketc6e2667e-tz5tcenzwzys.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "dev-indojap-site-imageuploadsbucketc6e2667e-fh1ue9kfotcs.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"dev-indojap-site-imageuploadsbucketc6e2667e-7t0ixg2zjveg.s3.amazonaws.com",
        port:"",
        pathname:"/**",
      }
    ],
  },
};

module.exports = nextConfig;
