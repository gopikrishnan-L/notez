import type { Metadata } from "next";
import { Lato, Lora, Rubik } from "next/font/google";
import "./globals.css";
import { auth, signIn } from "@/lib/auth";
import Navbar from "../components/navbar/Navbar";

const playfair = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mainfont",
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Notez",
  description: "Website to share notes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await signIn("google"); // Force sign in to obtain a new set of access and refresh tokens
  }

  return (
    <html lang="en">
      <body className={`${playfair.variable} min-h-screen bg-gray-100`}>
        <div className="min-h-screen w-full">
          <Navbar session={session} />
          <main>
            <div className="pt-4 pb-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
