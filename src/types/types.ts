import {HttpMethod, Status} from "./enum";

export interface BaseEvent {
    method: HttpMethod;
    headers: string;
    body: string;
}

export interface Event extends BaseEvent {
    id: number;
    status: Status
    created_at: Date;
    updated_at: Date;
}