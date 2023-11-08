import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";
import StyledComponentsRegistry from "../lib/registry";
import Navbar from "../components/Navbar";
import { AuthContextProvider } from "../hooks/authContext.js";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlanNLog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={roboto.className}>
      <body>
        <StyledComponentsRegistry>
          <AuthContextProvider>
            <Navbar />
            {children}
          </AuthContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
