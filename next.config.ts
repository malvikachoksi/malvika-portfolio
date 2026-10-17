import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be reached from other devices on the LAN
  // (phone/tablet testing via http://192.168.29.16:3000).
  allowedDevOrigins: ["192.168.29.16", "192.168.29.*"],
};

export default nextConfig;
