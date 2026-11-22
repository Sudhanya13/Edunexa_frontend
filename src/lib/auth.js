import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_URI);
export const db = client.db("Edunexa");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true,
        defaultValue: "student",
      },

      plan: {
        type: "string",
        input: false,
        defaultValue: "free",
      },
      subscriptionStatus: {
        type: "string",
        input: false,
        defaultValue: "inactive",
      },
      stripeCustomerId: {
        type: "string",
        input: false,
        returned: false,
      },
      stripeSubscriptionId: {
        type: "string",
        input: false,
        returned: false,
      },
      bookmarksLimit: {
        type: "number",
        input: false,
        defaultValue: 5,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // plugins: [jwt()],
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     strategy: "jwt",
  //     maxAge: 7 * 24 * 60 * 60,
  //   },
  // },
});
