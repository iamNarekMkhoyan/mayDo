import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ControlActionType, ControlActionTypes } from './note-controls.model';
import { sectionType, SectionTypes } from '../note/note.model';
import {
  CHECKBOX,
  DELETE,
  DELETE_NOTE,
  DELETE_SECTION,
  EDIT,
  TEXT,
} from 'src/app/shared/constants/images.const';

@Component({
  selector: 'app-note-controls',
  templateUrl: './note-controls.component.html',
  styleUrls: ['./note-controls.component.scss'],
})
export class NoteControlsComponent implements OnInit {
  TEXT = TEXT;
  EDIT = EDIT;
  DELETE = DELETE;
  CHECKBOX = CHECKBOX;
  DELETE_NOTE = DELETE_NOTE;
  DELETE_SECTION = DELETE_SECTION;
  public actionType: ControlActionType = 'DEFAULT';
  public ACTION_TYPES = ControlActionTypes;
  public SECTION_TYPES = SectionTypes;

  @Output() addSection: EventEmitter<sectionType> =
    new EventEmitter<sectionType>();
  @Output() deleteNote: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleSectionDeletion: EventEmitter<void> =
    new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public switchActionType(actionType: ControlActionType): void {
    this.actionType = this.ACTION_TYPES[actionType];
  }

  public createSection(type: sectionType): void {
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
