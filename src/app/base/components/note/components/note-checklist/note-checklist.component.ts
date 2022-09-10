import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICheckListSection } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-note-checklist',
  templateUrl: './note-checklist.component.html',
  styleUrls: ['./note-checklist.component.scss'],
})
export class NoteChecklistComponent implements OnInit {
  @Input() public checkListItems: ICheckListSection[] = [];
  @Input() public showButtons: boolean = false;
  @Output() valueChanges: EventEmitter<ICheckListSection[]> = new EventEmitter<
    ICheckListSection[]
  >();

  constructor() {}

  ngOnInit(): void {}

  public updateItemValue(value: Event, id: number): void {
    const checkboxValue = (value as CustomEvent).detail;
    const checkboxIndx = this.checkListItems.findIndex((box) => box.id === id);
    this.checkListItems[checkboxIndx].value = checkboxValue.value;
    this.valueChanges.emit(this.checkListItems);
  }

  public updateItemChecked(value: Event, id: number): void {
    const checkboxValue = (value as CustomEvent).detail;
    const checkboxIndx = this.checkListItems.findIndex((box) => box.id === id);
    this.checkListItems[checkboxIndx].checked = checkboxValue.checked;
    this.valueChanges.emit(this.checkListItems);
  }

  public deleteListItem(itemId: number): void {
    const itemIndx = this.checkListItems.findIndex(
      (item) => item.id === itemId
    );
    this.checkListItems.splice(itemIndx, 1);
  }

  public addListItem(): void {
    this.checkListItems.push({
      value: '',
      checked: false,
      id: this.checkListItems.length,
    });
  }
}
