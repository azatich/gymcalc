import type { Metadata } from "next";
import "./styles/globals.css";
import QueryProvider from "./providers/query-provider";
import ToasterProvider from "./providers/toaster";

export const metadata: Metadata = {
  title: "GymCacl",
  description: "Track your macros and calories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <ToasterProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
