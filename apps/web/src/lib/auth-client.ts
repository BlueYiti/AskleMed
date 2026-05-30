import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  fetchOptions: {
    credentials: "include",
  },

  plugins: [usernameClient()],
});

console.log("🌐 Auth baseURL:", process.env.NEXT_PUBLIC_API_URL);