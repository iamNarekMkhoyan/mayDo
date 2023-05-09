import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoteTextAreaComponent } from "./note-text-area.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [NoteTextAreaComponent],
  imports: [CommonModule, IonicModule],
  exports: [NoteTextAreaComponent],
})
export class NoteTextareaModule {}
