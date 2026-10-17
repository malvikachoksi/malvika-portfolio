import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Single-page site: one canonical entry. The in-page sections are #anchors, not
// routes, so listing them would just be duplicate URLs pointing at the same page.
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
