import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Resume Builder | Create Professional Resumes",
  description: "Create, customize, and download professional resumes in minutes with our free online resume builder.",
  keywords: "resume builder, cv maker, online resume, professional resume, free resume builder, download resume",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-50">
        <Providers>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: "!bg-white !text-gray-900 dark:!bg-gray-800 dark:!text-gray-100 shadow-lg",
              duration: 3000,
              success: {
                className: "!bg-green-50 !text-green-800 dark:!bg-green-900/20 dark:!text-green-200",
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#ECFDF5",
                },
              },
              error: {
                className: "!bg-red-50 !text-red-800 dark:!bg-red-900/20 dark:!text-red-200",
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#FEE2E2",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
