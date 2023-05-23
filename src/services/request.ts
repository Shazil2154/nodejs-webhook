import fetch from "node-fetch";
import {IncomingMessage} from "http";
import {addEvent} from "./event";
import {HttpMethod} from "../types/enum";
export const sendRequest = async (request: IncomingMessage): Promise<void> => {
    const buffer: Uint8Array[] = [];

    request.on('data', (chunk) => {
       buffer.push(chunk)
    })

    request.on('end', async () => {
        const method = request.method || "POST";
        const jsonBody  = Buffer.concat(buffer).toString();
        const body = JSON.parse(jsonBody);
        await addEvent({method: method as HttpMethod, body: jsonBody, headers: JSON.stringify(request.headers)})
        await makeRequest(method as HttpMethod, body.attributes.type, jsonBody);

    })
}

export const makeRequest = async (method: HttpMethod, type: string, body: string) => {
    const apiUrl = `${process.env.API_URL}/${type}`;
    return fetch(apiUrl, {
        method,
        body: body,
        headers: {
            'content-type': 'application/json'
        }
    })
}