import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { SectionTypesEnum } from "@shared/types/note.model";
import { Note } from "@shared/interfaces/note.interface";

@Component({
  selector: "app-note-widget",
  templateUrl: "./note-widget.component.html",
  styleUrls: ["./note-widget.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteWidgetComponent {
  public SECTION_TYPES = SectionTypesEnum;
  @Input() note!: Note;
}
