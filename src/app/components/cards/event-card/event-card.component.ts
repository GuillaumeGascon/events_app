import { Component, Input, OnInit } from '@angular/core';
import { ListEvent } from 'src/app/pages/admin/list/list-event.page';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {

  @Input() listEvent!: ListEvent;

  constructor() { }

  ngOnInit() {}

}
