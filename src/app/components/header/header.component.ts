import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() translucent!: boolean;
  @Input() title!: string;
  @Input() changeBackButton!: boolean;
  @Input() logo!: boolean;
  @Input() showButton = true;
  @Input() color = 'white';

  @Output() backButtonClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
