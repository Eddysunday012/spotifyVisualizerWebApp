import { getProviders, signIn } from "next-auth/react";

export default function Login({ providers }: any) {
  return (
    <div>
      <h1>This is the login page</h1>
      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name}>
            <button
              onClick={() => {
                signIn(provider.id, { callbackUrl: "/" });
              }}
            >
              LOGIN WITH SPOTIFY
            </button>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
