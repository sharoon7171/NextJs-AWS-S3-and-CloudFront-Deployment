import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js on AWS Amplify",
  description: "Professional Next.js 15 application deployed on AWS Lambda using AWS Amplify - scalable, fast, and cost-effective serverless architecture",
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

