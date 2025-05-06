import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ORIGINAL_URL } from "@/utils/helpers";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const effectiveBaseUrl = ORIGINAL_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "CodingHero - Learn to Code with Ease",
  description: "Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology",
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
  metadataBase: new URL(effectiveBaseUrl),
  alternates: {
    canonical: effectiveBaseUrl,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            toastOptions={{
              className: "p-6",
            }}
            position='top-center'
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
