import { formatDate } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements OnInit {

  @ViewChild('input') input!: IonInput;

  @Input() error!: string | null;
  @Input() hint!: string | null;
  @Input() label!: string;
  @Input() name!: string;

  value!: string | null;

  @Output() eventDate = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {}

  onChange = (text: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setFocus(): void {
    this.input.setFocus();
  }

  setDate(e: any): void {
    let date = e.detail.value;
    this.eventDate.emit(date);
    date = formatDate(date, 'short', 'en');
    this.input.value = date;
  }

}
