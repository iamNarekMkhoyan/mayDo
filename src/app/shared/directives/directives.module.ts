import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectForDeletionDirective } from './select-for-deletion.directive';

@NgModule({
  declarations: [SelectForDeletionDirective],
  imports: [CommonModule],
  exports: [SelectForDeletionDirective],
})
export class DirectivesModule {}
