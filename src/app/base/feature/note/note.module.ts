import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";

import { NoteComponent } from "./note.component";
import { DirectivesModule } from "src/app/shared/directives/directives.module";
import { NoteControlsModule } from "@base/ui/controls/note-controls/note-controls.module";
import { NoteTextareaModule } from "@base/ui/controls/note-text-area/note-textarea.module";
import { NoteChecklistModule } from "@base/ui/controls/note-checklist/note-checklist.module";

@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    NoteControlsModule,
    DirectivesModule,
    NoteTextareaModule,
    NoteChecklistModule,
  ],
  exports: [NoteComponent],
})
export class NoteModule {}
