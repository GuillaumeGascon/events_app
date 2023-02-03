import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { passwordRegexp } from 'src/app/helpers/regexp';

@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {

  @ViewChild('input') input!: IonInput;

  @Input() error!: string | null;
  @Input() hint!: string | null;
  @Input() label!: string;
  @Input() name!: string;
  @Input() set password(value: string) {
    this.checkPassword(value);
  }

  value!: string | null;

  showPassword = false;

  onChange = (password: string) => {};
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

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  checkPassword(password: string): void {
    const valid = passwordRegexp.test(password);
    console.log(valid);
  }

  setFocus(): void {
    this.input.setFocus();
  }

}
