import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteWidgetComponent } from './note-widget.component';

@NgModule({
  declarations: [NoteWidgetComponent],
  imports: [CommonModule],
  exports: [NoteWidgetComponent],
})
export class NoteWidgetModule {}
