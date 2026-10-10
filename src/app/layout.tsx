import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";



// Noto Serif Bengali Font Configuration
const notoSerifBangla = Noto_Serif_Bengali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-serif-bangla",
});

export const metadata: Metadata = {
  title: "BazarDor | বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
   icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme='light'
      className={` ${notoSerifBangla.className} ${notoSerifBangla.className} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F0F5F0]">
        <Header />

        <Marquee />

        <main className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer></Footer>
        <ToastContainer />
      </body>
    </html>
  );
}