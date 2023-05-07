import { Directive, ElementRef, Input } from '@angular/core';
import { IonTextarea } from '@ionic/angular';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  @Input('appAutofocus') set itemIndex(value: number) {
    if (value && value >= 0) {
      (this.element.nativeElement as IonTextarea).setFocus();
    }
  }

  constructor(private element: ElementRef) {}
}
