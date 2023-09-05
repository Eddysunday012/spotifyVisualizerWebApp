"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session,
}: {
  session: any;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
