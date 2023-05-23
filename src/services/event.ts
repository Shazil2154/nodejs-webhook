import db from '../utils/db';
import {BaseEvent} from "../types/types";

export const addEvent = async (event: BaseEvent): Promise<void> => {
    const query = `
    INSERT INTO requests (method, body, headers) VALUES ($1, $2, $3)
    `
    const values = [event.method, event.body, event.headers];
    await db.query(query, values);
}