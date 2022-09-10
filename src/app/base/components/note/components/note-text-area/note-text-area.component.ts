import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ICheckListSection,
  ITextAreaSection,
} from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-note-text-area',
  templateUrl: './note-text-area.component.html',
  styleUrls: ['./note-text-area.component.scss'],
})
export class NoteTextAreaComponent implements OnInit {
  @Input() public textArea: ITextAreaSection = {value: ''};
  @Output() valueChanges: EventEmitter<ITextAreaSection> =
    new EventEmitter<ITextAreaSection>();

  constructor() {}

  ngOnInit(): void {}

  changeValue(value: Event) {
    const event = value as CustomEvent;
    this.textArea.value = event.detail.value;
    this.valueChanges.emit(this.textArea);
  }
}
