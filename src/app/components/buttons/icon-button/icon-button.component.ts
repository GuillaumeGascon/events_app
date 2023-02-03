import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {

  @Input() icon!: string;
  @Input() size!: string;
  @Input() color!: string;

  @Output() clicked = new EventEmitter();

}
