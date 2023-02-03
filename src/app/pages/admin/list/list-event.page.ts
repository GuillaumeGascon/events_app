import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { showActionSheetModal } from 'src/app/helpers/show-action-sheet-modal';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { ImageService } from 'src/app/services/image.service';

export interface ListEvent {
  event: Event,
  image: {
    b64: any,
    contentType: string,
  }
}

@Component({
  selector: 'list-event',
  templateUrl: './list-event.page.html',
  styleUrls: ['./list-event.page.scss'],
})
export class ListEventPage {

  events: Event[] = [];
  listEvents: ListEvent[] = [];

  noEvents = false;

  constructor(
    private modalCtrl: ModalController,
    private eventService: EventService,
    private imageService: ImageService,
  ) { }

  async ionViewDidEnter(): Promise<void> {
    await this.getEvent();
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

  async onDelete(id: number | undefined): Promise<void> {
    if (id) {
      await showActionSheetModal(
        this.modalCtrl,
        'Delete this event ?',
        'Are you sure you want to delete this event ? This action is irreversible',
        'danger',
        'Delete',
        'Cancel',
        id,
        () => this.delete(id)
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.eventService.deleteEvent(id);
      await this.getEvent();
    } catch (err) {
      console.error(err);
    }
  }


}
