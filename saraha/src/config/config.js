
import path from "node:path";
import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";

const envPath = path.resolve(
    env === "development"
        ? ".env.dev"
        : ".env.production"
);

config({ path: envPath });

export const PORT = Number(process.env.PORT) || 3000;

export const DATABASE = process.env.DATABASE_URL;

if (!DATABASE) {
    throw new Error("DATABASE_URL is missing");
}

export const front_end_cors =process.env.FRONT_END_CORS;

export const encryption_key= process.env.SECRET_KEY

export const google_audience_key= process.env.GOOGLE_CLIENT_ID;

export const redis_key= process.env.REDIS_KEY;

export const nodemailer_pass = process.env.NODEMAILER_PASS;
export const nodemailer_user = process.env.NODEMAILER_USER;

export const nodemailer_host = process.env.NODEMAILER_HOST;
export const nodemailer_port = process.env.NODEMAILER_PORT;

