import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListEvent } from 'src/app/pages/admin/list/list-event.page';

@Component({
  selector: 'event-list-card',
  templateUrl: './event-list-card.component.html',
  styleUrls: ['./event-list-card.component.scss'],
})
export class EventListCardComponent implements OnInit {

  @Input() listEvent!: ListEvent;

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
