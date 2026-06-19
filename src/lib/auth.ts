import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "varityweb.com";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: {
    allowedHosts: [
      "localhost:3000",
      "app.localhost:3000",
      "editor.localhost:3000",
      rootDomain,
      `app.${rootDomain}`,
      `editor.${rootDomain}`,
      `*.localhost:3000`,
      `*.${rootDomain}`,
    ],
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://*.localhost:3000",
    `https://${rootDomain}`,
    `https://*.${rootDomain}`,
  ],
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? `.${rootDomain}` : undefined,
    },
  },
});
