import { Client } from "pg";

class DB {
    private static instance: DB;
    private client: Client;

    private constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    async connect() {
        await this.client.connect();
    }

    async end() {
        await this.client.end();
    }

    async query(query: string, params?: any[]) {
        const result = await this.client.query(query, params);
        return result.rows;
    }
}

export default DB.getInstance();
