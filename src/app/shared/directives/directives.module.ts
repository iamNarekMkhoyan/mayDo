import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectForDeletionDirective } from './select-for-deletion.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [SelectForDeletionDirective, AutofocusDirective],
  imports: [CommonModule],
  exports: [SelectForDeletionDirective, AutofocusDirective],
})
export class DirectivesModule {}
