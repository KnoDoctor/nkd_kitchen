import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

const prisma = new PrismaClient();
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
	/*
    
    TODO:

    This needs to be sorted. I believe that
    we need to expose the DB but not 100% 
    sure on next steps.

    --Jeff
    
    */
	adapter: PrismaAdapter(prisma),

	// More Info: https://next-auth.js.org/configuration/providers/oauth
	providers: [
		/* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
		// FacebookProvider({
		//   clientId: process.env.FACEBOOK_ID,
		//   clientSecret: process.env.FACEBOOK_SECRET,
		// }),
		// GithubProvider({
		//   clientId: process.env.GITHUB_ID,
		//   clientSecret: process.env.GITHUB_SECRET,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// TwitterProvider({
		//   clientId: process.env.TWITTER_ID,
		//   clientSecret: process.env.TWITTER_SECRET,
		// }),
		// Auth0Provider({
		//   clientId: process.env.AUTH0_ID,
		//   clientSecret: process.env.AUTH0_SECRET,
		//   issuer: process.env.AUTH0_ISSUER,
		// }),
	],
	theme: {
		colorScheme: "light",
	},
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `jwt` is automatically set to `true` if no database is specified.
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token }) {
			if (
				token.email === "barfieldjt@gmail.com" ||
				token.email === "andrewbarfield4@gmail.com" ||
				token.email === "meagan.trush@gmail.com" ||
				token.email === "jeff.barfield@butterfield.com"
			) {
				token.userRole = "admin";
				return token;
			}

			return token;
		},
	},
};

export default NextAuth(authOptions);
