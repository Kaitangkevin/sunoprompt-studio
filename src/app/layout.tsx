import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SunoPrompt Studio",
  description: "Create better lyrics and style prompts for Suno AI Music."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
