import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'base64',
  templateUrl: './base64.component.html',
  styleUrls: ['./base64.component.scss'],
})
export class Base64Component implements OnInit {

  @Input() b64!: any;
  @Input() mime!: string;

  constructor() { }

  ngOnInit() {}

}
