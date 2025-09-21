// src/db/index.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/db/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
	if (_db) return _db;

	const url = process.env.TURSO_CONNECTION_URL;
	const authToken = process.env.TURSO_AUTH_TOKEN;

	// Guard: if env vars missing (e.g. build time on Netlify), return null
	if (!url) {
		console.warn("TURSO_CONNECTION_URL not set — returning null db");
		return null;
	}

	const client = createClient({ url, authToken });
	_db = drizzle(client, { schema });
	return _db;
}

// Convenience type
export type Database = NonNullable<ReturnType<typeof getDb>>;
