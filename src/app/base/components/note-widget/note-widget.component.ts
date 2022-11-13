import { Component, Input, OnInit } from '@angular/core';
import { INote } from 'src/app/shared/models/note.model';
import { SectionTypes } from '../note/note.model';

@Component({
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.scss'],
})
export class NoteWidgetComponent implements OnInit {
  public SECTION_TYPES = SectionTypes;
  @Input() note!: INote;

  constructor() {}

  ngOnInit(): void {}
}
