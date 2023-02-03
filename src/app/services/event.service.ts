import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { eventEndpoints } from "../endpoints/event.endpoint";
import { Event } from "../models/event";

export interface ApiImage {
  _id: string;
  name: string;
  createdAt: Date;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) {}

  async createEvent(event: Event): Promise<Event> {
    const newEvent = this.http.post<Event>(eventEndpoints.create(), event)
      .pipe(map(async result => {
        return result;
      }));
    return firstValueFrom(newEvent)

  }

  async getEvent(): Promise<Event[]> {
    const events = this.http.get<Event[]>(eventEndpoints.get());
    return await firstValueFrom(events);
  }

  async deleteEvent(id: number): Promise<any> {
    const rm = this.http.delete(eventEndpoints.remove(id));
    return await firstValueFrom(rm);
  }


}
