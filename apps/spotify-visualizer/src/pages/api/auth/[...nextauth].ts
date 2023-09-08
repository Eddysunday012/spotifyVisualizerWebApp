import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL, spotifyApi } from "../../../lib/spotify";

async function refreshAcessToken({ token }: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "refresh token error",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: LOGIN_URL,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user)
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      // token is valid
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // access token expires -> refresh the token
      return await refreshAcessToken(token);
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
};

// token.access_token
export default NextAuth(authOptions);
