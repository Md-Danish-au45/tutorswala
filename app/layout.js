// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Tutorswala - Quality Tutoring",
  description: "Connecting students with expert tutors",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
