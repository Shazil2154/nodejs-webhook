import http, { IncomingMessage, ServerResponse } from 'http';
import  database  from './utils/db';
import { sendRequest } from "./services/request";

const port = process.env.PORT;

const server = http.createServer();

server.on('request', async (request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(202, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ success: true }));
    response.end();
    await sendRequest(request);
})

server.listen(port, async () => {
    try{
         await database.connect();
         console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database', error);
        throw error;
    }
    console.log(`Server is running on port ${port}`);
});

