import type { Metadata } from "next";
// Self-hosted font: bundled from npm, so builds don't depend on fetching Google Fonts.
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduSphere – School, College & Sports Management",
  description:
    "One powerful platform to manage schools, colleges and sports academies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
