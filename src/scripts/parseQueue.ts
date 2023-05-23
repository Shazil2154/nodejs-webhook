import db from '../utils/db';
import {Event} from "../types/types";
import {makeRequest} from "../services/request";
import {Status} from "../types/enum";
import { config } from 'dotenv';

config();
const getQueuedEvents = async () => {
    const query = `
    SELECT * FROM requests WHERE status = 'QUEUED'
    `;
    return await db.query(query) as Event[];

};

const changeEventStatus = async (id: number, status: Status) => {
    const query = `
    UPDATE requests SET status = $1 WHERE id = $2
    `;
    const values = [status, id];
    await db.query(query, values);
}

async function parseQueue() {
    await db.connect();
    const queuedEvents = await getQueuedEvents();

    const requests = queuedEvents.map(async (event) => {
        const body = JSON.parse(event.body);
        await makeRequest(event.method, event.body, body.attributes.type);
        await changeEventStatus(event.id, Status.SUCCESS);
    })

    await Promise.all(requests);
    await db.end();
}

parseQueue();
