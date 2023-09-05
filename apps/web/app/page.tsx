"use client";

import { Button, Header } from "ui";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page(): JSX.Element {
  // return (
  //   <>
  //     <Header text="Web" />
  //     <Button />
  //   </>
  // );

  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}
