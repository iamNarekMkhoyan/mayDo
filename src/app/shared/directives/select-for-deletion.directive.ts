import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appSelectForDeletion]',
})
export class SelectForDeletionDirective {
  private state: boolean = false;

  @Input() set appSelectForDeletion(value: boolean) {
    this.state = value;
    this.setSelectionState();
    if (!value) {
      this.cancelSelection();
    }
  }

  @Output() selectSection: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  private toggleSelection(event: Event) {
    if (this.state) {
      const element = this.el.nativeElement as HTMLDivElement;
      if (element.classList.contains('deletion-ready')) {
        element.classList.remove('deletion-ready');
      } else {
        element.classList.add('deletion-ready');
      }
      this.selectSection.emit();
    } else {
      event.preventDefault();
      return;
    }
  }

  constructor(private el: ElementRef) {}

  private setSelectionState(): void {
    const element = this.el.nativeElement as HTMLDivElement;
    if (this.state) {
      element.classList.add('selection-ready');
    } else {
      element.classList.remove('selection-ready');
    }
  }

  private cancelSelection(): void {
    const element = this.el.nativeElement as HTMLDivElement;
    element.classList.remove('deletion-ready');
  }
}
