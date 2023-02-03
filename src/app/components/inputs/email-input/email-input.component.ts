import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidator, ControlValueAccessor, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    }
  ]
})
export class EmailInputComponent implements OnInit, OnDestroy, ControlValueAccessor, AsyncValidator {

  @ViewChild('input') input!: IonInput;

  @Input() check!: boolean;
  @Input() error!: string | null;
  @Input() hint!: string | null;
  @Input() label!: string;
  @Input() name!: string;

  value!: string | null;
  sub!: Subscription;

  valid = true;
  change = new Subject<string>();

  ngOnInit(): void {
    this.sub = this.change.pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(email => this.onChange(email));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onChange = (email: string) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    if (this.check) {
      try {
        console.log(control.value);
        this.valid = true;
        return null;
      } catch (err) {
        console.error(err);
        this.valid = false;
        return { valid: false };
      }
    } else {
      this.valid = true;
      return null;
    }
  }

  setFocus(): void {
    this.input.setFocus();
  }

}
