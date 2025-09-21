// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { getDb } from "@/db"; // <- use lazy getter, not direct db import

const db = getDb();

const authConfig: any = {
	emailAndPassword: {
		enabled: true,
	},
	plugins: [bearer()],
	autoCreateUser: true,

	// ensure user always has a name
	events: {
		onUserCreate: async (
			user: { name: string | null; email: string | null },
			ctx: any
		) => {
			if (!user.name || user.name.trim() === "") {
				user.name = user.email?.split("@")[0] ?? "User";
			}
			return user;
		},
	},
};

// only attach database adapter if db available at runtime
if (db) {
	authConfig.database = drizzleAdapter(db, { provider: "sqlite" });
}

export const auth = betterAuth(authConfig);

// Session validation helper
export async function getCurrentUser(request: NextRequest) {
	const session = await auth.api.getSession({ headers: await headers() });
	return session?.user || null;
}
