import type {Profile, AuthOptions, Session, User} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";

import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import {MongoClient} from "mongodb";
import {encode, decode} from "next-auth/jwt";
import bcrypt from "bcryptjs";
import {AdapterUser} from "next-auth/adapters";

/** The OAuth profile returned from your provider */
type IProfile = {
    login?: string,
    avatar_url?: string,
    email: string
} & Profile;

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(MongoClient.connect(process.env.MONGODB_URI as string), {databaseName: process.env.MONGODB_DBNAME}),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt"
  },
  jwt: {encode, decode},
  providers: [

    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: {label: "email", type: "text", placeholder: "email"},
        password: {label: "Password", type: "password", placeholder: "password"},
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) return null;
        
        const adapter = authOptions.adapter;
        
        if (adapter && adapter.getUserByEmail && adapter.createUser) {

          let user = await adapter.getUserByEmail(credentials.email);
          if (user) {
            const {salt, passwordHash} = user as AdapterUser & {salt: string, passwordHash: string};
            if (bcrypt.compareSync(credentials.password, passwordHash)) return user;
          } else {
            const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPTSALTROUNDS as string));
            const passwordHash = bcrypt.hashSync(credentials.password, salt);
            const newUser = {
              email: credentials.email,
              emailVerified: new Date(),
              salt,
              passwordHash
            };
            const user = adapter.createUser(newUser);
            return user;
          }
        }
        return null;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt({token, account, profile}) {
      // ajouter infos au token session
      return token;
    },
    async session({session, token}: { session: Session, token: unknown }) {
      return session;
    },
    async signIn(params) {
      const {user} = params;
      if (user) {
        return true;
      }
      return false;
    },  
    async redirect({url, baseUrl}) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    //signIn: "/auth/signin"
  }
};
