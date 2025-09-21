import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { db } from "@/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [bearer()],
	autoCreateUser: true,

	// 👇 Add this hook to prevent null names
	events: {
		onUserCreate: async (user, ctx) => {
			if (!user.name || user.name.trim() === "") {
				user.name = user.email?.split("@")[0] ?? "User";
			}
			return user;
		},
	},
});

// Session validation helper
export async function getCurrentUser(request: NextRequest) {
	const session = await auth.api.getSession({ headers: await headers() });
	return session?.user || null;
}
