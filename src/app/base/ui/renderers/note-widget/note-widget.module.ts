import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { NoteWidgetComponent } from "./note-widget.component";
import { NoteTextareaModule } from "@base/ui/controls/note-text-area/note-textarea.module";
import { NoteChecklistModule } from "@base/ui/controls/note-checklist/note-checklist.module";

@NgModule({
  declarations: [NoteWidgetComponent],
  imports: [CommonModule, IonicModule, NoteTextareaModule, NoteChecklistModule],
  exports: [NoteWidgetComponent],
})
export class NoteWidgetModule {}
