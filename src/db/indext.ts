
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connect_database= process.env.DATABASE_URL

export const client = postgres(connect_database as string , {prepare:false})
export const db = drizzle(client)