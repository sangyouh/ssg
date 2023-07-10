/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    env: {
        NOTION_KEY: process.env.NOTION_KEY,
        NOTION_DATABASE: process.env.NOTION_DATABASE,
    },
    output: "export"
}
