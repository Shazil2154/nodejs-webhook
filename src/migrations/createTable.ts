import db from '../utils/db';

const createRequestTable = async () => {
    await db.connect();
    const query = `
        CREATE TABLE IF NOT EXISTS requests (
            id SERIAL PRIMARY KEY,
            method VARCHAR(50) NOT NULL,
            body TEXT NOT NULL,
            headers TEXT NOT NULL,
            status VARCHAR(55) DEFAULT 'QUEUED',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `;
    await db.query(query);
    await db.end()
}

createRequestTable()
