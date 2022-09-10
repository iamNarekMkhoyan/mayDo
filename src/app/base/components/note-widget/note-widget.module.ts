import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NoteModule } from '../note/note.module';
import { NoteWidgetComponent } from './note-widget.component';

@NgModule({
  declarations: [NoteWidgetComponent],
  imports: [CommonModule, IonicModule, NoteModule],
  exports: [NoteWidgetComponent],
})
export class NoteWidgetModule {}
