import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js AWS Lambda Deployment",
  description: "Professional Next.js application deployed on AWS Lambda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

