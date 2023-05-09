import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";

import { CHECKBOX, DELETE, DELETE_NOTE, DELETE_SECTION, EDIT, TEXT } from "@shared/constants/images.constant";
import { ControlActionType, ControlActionTypes } from "@shared/types/note-controls.model";
import { SectionTypesEnum, SectionType } from "@shared/types/note.model";

@Component({
  selector: "app-note-controls",
  templateUrl: "./note-controls.component.html",
  styleUrls: ["./note-controls.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteControlsComponent implements OnInit {
  TEXT = TEXT;
  EDIT = EDIT;
  DELETE = DELETE;
  CHECKBOX = CHECKBOX;
  DELETE_NOTE = DELETE_NOTE;
  DELETE_SECTION = DELETE_SECTION;
  public actionType: ControlActionType = "DEFAULT";
  public ACTION_TYPES = ControlActionTypes;
  public SECTION_TYPES = SectionTypesEnum;

  @Output() addSection: EventEmitter<SectionType> = new EventEmitter<SectionType>();
  @Output() deleteNote: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleSectionDeletion: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public switchActionType(actionType: ControlActionType): void {
    this.actionType = this.ACTION_TYPES[actionType];
  }

  public createSection(type: SectionType): void {
    this.addSection.emit(this.SECTION_TYPES[type]);
    this.actionType = this.ACTION_TYPES.DEFAULT;
  }

  public deleteWholeNote(): void {
    this.deleteNote.emit();
  }

  public toggleSectionDelete(): void {
    this.toggleSectionDeletion.emit();
  }
}
