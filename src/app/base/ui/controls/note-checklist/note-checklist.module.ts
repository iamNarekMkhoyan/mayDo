import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoteChecklistComponent } from "./note-checklist.component";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "@shared/directives/directives.module";

@NgModule({
  declarations: [NoteChecklistComponent],
  imports: [CommonModule, IonicModule, TranslateModule, DirectivesModule],
  exports: [NoteChecklistComponent],
})
export class NoteChecklistModule {}
