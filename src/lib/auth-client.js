// import { createAuthClient } from "better-auth/react";
// import { jwtClient } from "better-auth/client/plugins";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   //  plugins: [inferAdditionalFields<typeof auth>()],
//   baseURL: process.env.BETTER_AUTH_URL,
//   plugins: [jwtClient()],
// });

// export const { signIn, signUp, useSession } = authClient;
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Optional when served from the same domain as your auth routes
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, useSession } = authClient;
