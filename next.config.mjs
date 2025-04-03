/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SERVER_APP_URL: process.env.SERVER_APP_URL,
    }
}


export default nextConfig;
