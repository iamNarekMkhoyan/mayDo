import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NoteChecklistComponent } from './components/note-checklist/note-checklist.component';
import { NoteTextAreaComponent } from './components/note-text-area/note-text-area.component';
import { NoteControlsModule } from './../note-controls/note-controls.module';
import { NoteComponent } from './note.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';

@NgModule({
  declarations: [NoteComponent, NoteTextAreaComponent, NoteChecklistComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    NoteControlsModule,
    DirectivesModule,
  ],
  exports: [NoteComponent, NoteTextAreaComponent, NoteChecklistComponent],
})
export class NoteModule {}
