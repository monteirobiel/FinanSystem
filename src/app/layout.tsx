"use client";

import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicRoute = ["/", "/home", "/login", "/signup"].includes(pathname);

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black`}
        >
          {/* Só mostrar o header com o UserButton se NÃO for uma rota pública de login/signup */}
          {!isPublicRoute ||
          (isPublicRoute && pathname !== "/login" && pathname !== "/signup") ? (
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedIn>
                <UserButton afterSignOutUrl="/login" />
              </SignedIn>
              <SignedOut>
                {!isPublicRoute && (
                  <a
                    href="/login"
                    className="px-4 py-2 text-blue-600 hover:underline"
                  >
                    Login
                  </a>
                )}
              </SignedOut>
            </header>
          ) : null}

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
