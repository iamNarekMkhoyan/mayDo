import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { take, timer } from 'rxjs';
import { ICheckListSection } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-note-checklist',
  templateUrl: './note-checklist.component.html',
  styleUrls: ['./note-checklist.component.scss'],
})
export class NoteChecklistComponent {
  public activeItemId!: number;

  @Input() public checkListItems: ICheckListSection[] = [];
  @Input() public showButtons: boolean = false;
  @Output() valueChanges: EventEmitter<ICheckListSection[]> = new EventEmitter<
    ICheckListSection[]
  >();

  @HostListener('document:keydown.enter', ['$event'])
  private enterKeyHandler(event: KeyboardEvent): void {
    event.preventDefault();
    this.addListItem();
  }

  @HostListener('document:keydown.backspace', ['$event'])
  private backspaceHandler(event: KeyboardEvent): void {
    if (!this.activeItemId) {
      return;
    }
    if (this.checkListItems[this.activeItemId].value) {
      return;
    }
    event.preventDefault();
    this.deleteListItem(this.activeItemId);
    this.activeItemId--;
  }

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
    this.activeItemId = this.checkListItems.length;
  }

  public showCloseIcon(index: number) {
    this.activeItemId = index;
    const closeIcon = document.querySelector('.close-icon__' + index);
    timer(50)
      .pipe(take(1))
      .subscribe(() => closeIcon?.classList.add('close-icon__active'));
  }

  public hideCloseIcon(index: number) {
    const closeIcon = document.querySelector('.close-icon__' + index);
    timer(50)
      .pipe(take(1))
      .subscribe(() => closeIcon?.classList.remove('close-icon__active'));
  }
}
