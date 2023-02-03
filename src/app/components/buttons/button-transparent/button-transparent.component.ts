import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'button-transparent',
  templateUrl: './button-transparent.component.html',
  styleUrls: ['./button-transparent.component.scss'],
})
export class ButtonTransparentComponent implements OnInit {

  @Input() label!: string;
  @Input() size!: string;
  @Input() color!: string;

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
