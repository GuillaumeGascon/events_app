import { Component, OnInit } from '@angular/core';
import { storage } from 'src/app/helpers/storage';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { EventService } from 'src/app/services/event.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { ListEvent } from '../../admin/list/list-event.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  me!: User;
  events: Event[] = [];
  listEvents: ListEvent[] = [];

  noEvents = false;

  constructor(
    private eventService: EventService,
    private imageService: ImageService,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.me = await this.getMe();
      await storage.set(
        UserService.USER_ID,
        this.me.id
      );
    } catch (err) {
      console.error(err);
    }
  }

  async ionViewDidEnter(): Promise<void> {
    await this.getEvent();
  }

  async getMe(): Promise<User> {
    return await this.userService.me();
  }

  async getEvent(): Promise<void> {
    try {
      const events = await this.eventService.getEvent();
      if (events.length !== 0) {
        this.noEvents = false;
        if (events.length !== this.events.length) {
          this.events = events;
          this.events.forEach(async event => {
            const image = await this.imageService.getImageById(Number(event.banner));
            const e: ListEvent = {
              event,
              image: {
                b64: image.b64,
                contentType: image.contentType
              }
            }
            this.listEvents.push(e);
          });
        } else {
          this.events = events;
        }
      } else {
        this.noEvents = true;
        this.listEvents = [];
      }
    } catch (err) {
      console.error(err);
    }
  }

}
