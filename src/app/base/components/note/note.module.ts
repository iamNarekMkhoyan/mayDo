import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NoteComponent } from './note.component';
import { NoteTextAreaComponent } from './components/note-text-area/note-text-area.component';
import { NoteChecklistComponent } from './components/note-checklist/note-checklist.component';

@NgModule({
  declarations: [NoteComponent, NoteTextAreaComponent, NoteChecklistComponent],
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  exports: [NoteComponent, NoteTextAreaComponent, NoteChecklistComponent],
})
export class NoteModule {}
