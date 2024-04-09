import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

// import "../globals.css";
import { ReduxProvider } from "@/modules/providers/reduxProvider";
import { WalletProvider } from "@/modules/providers/walletProvider";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: "Adlink-interface ",
  description: "Adlink Cooperation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
