import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mnlyhjoqqbulcocnsvdx.supabase.co",
      },
    ],
  },
};

export default nextConfig;
