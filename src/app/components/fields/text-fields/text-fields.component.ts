import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-fields',
  templateUrl: './text-fields.component.html',
  styleUrls: ['./text-fields.component.scss'],
})
export class TextFieldsComponent {

  @Input() value!: string;
  @Input() label!: string;
  @Input() color!: string;
  @Input() icon!: string;

  @Output() edit = new EventEmitter();

}
