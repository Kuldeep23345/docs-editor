import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://organic-pangolin-16.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;