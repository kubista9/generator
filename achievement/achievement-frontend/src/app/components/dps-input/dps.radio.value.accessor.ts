import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, forwardRef } from '@angular/core';

@Directive({
  selector: 'dps-radio',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DpsRadioValueAccessor),
      multi: true
    }
  ]
})

export class DpsRadioValueAccessor implements ControlValueAccessor {
  constructor(private elementRef: ElementRef) {}

  writeValue(value: any): void {
    this.elementRef.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this.elementRef.nativeElement.addEventListener('radio', (event: any) => {
      fn(event.target.value);
    });
  }

  registerOnTouched(fn: any): void {
    this.elementRef.nativeElement.addEventListener('blur', fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}

