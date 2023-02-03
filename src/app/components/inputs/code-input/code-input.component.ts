import { Component, forwardRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true
    }
  ]
})
export class CodeInputComponent implements ControlValueAccessor {

  @ViewChild('input') input!: IonInput;

  @Input() error!: string | null;
  @Input() hint!: string | null;
  @Input() label!: string;
  @Input() name!: string;

  value!: string | null;

  onChange = (code: string) => {};
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

}
