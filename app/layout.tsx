import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  personJsonLd,
} from "@/lib/seo";
import "./globals.css";

// Self-hosted at build time, which removes the render-blocking round trip to
// fonts.googleapis.com and the fonts.gstatic.com hop that followed it.
// Inter is a variable font, so it needs no weight list; Poppins is not.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  // Only these two are used (font-semibold / font-bold on font-poppins).
  // projectTile.js also names Poppins, but that renders inside an SVG data URI
  // loaded as an <img>, which cannot reach the document's @font-face rules.
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  // Lets every URL-based field below use a relative path.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Any future route can set its own title and get "Foo | Malvika Choksi".
    template: `%s | Malvika Choksi`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Malvika Choksi", url: SITE_URL }],
  creator: "Malvika Choksi",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    // Used by more scrapers than Twitter alone. No creator handle — the site
    // no longer links a Twitter profile.
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

// Applies the stored theme before first paint so dark-mode visitors don't see
// a white flash. ThemeContext reads this class back on mount.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
