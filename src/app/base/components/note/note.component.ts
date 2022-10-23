import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subject, switchMap, takeUntil } from 'rxjs';

import {
  ICheckListSection,
  INote,
  ITextAreaSection,
} from 'src/app/shared/models/note.model';
import { ToastAlertService } from 'src/app/shared/services/toast-alert.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnDestroy {
  public note!: INote;
  private sub$: Subject<Object> = new Subject();

  @Output() emptyDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastAlert: ToastAlertService,
    private dbService: NgxIndexedDBService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        takeUntil(this.sub$),
        switchMap((params: Params) =>
          this.dbService.getByKey('notes', Number(params['id']))
        )
      )
      .subscribe((resultNote) => (this.note = resultNote as INote));
  }

  ngOnDestroy(): void {
    this.sub$.next({});
    this.sub$.complete();
  }

  public navigateBack(): void {
    if (this.isNoteEmpty) {
      this.deleteNote(this.note.id);
      this.toastAlert.emptyDeleted.next(true);
    } else {
      this.router.navigate(['../']);
      this.note.dateTimeEdited = new Date();
      this.dbService
        .update('notes', this.note)
        .pipe(takeUntil(this.sub$))
        .subscribe();
    }
  }

  public deleteNote(id: number): void {
    this.dbService
      .deleteByKey('notes', id)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => this.router.navigate(['../']));
  }

  public addSection(type: string): void {
    if (type === 'text') {
      this.note.sections.push({
        id: this.note.sections.length,
        type,
        checkList: [
          {
            checked: false,
            value: '',
            id: 0,
          },
        ],
        textArea: { value: '' },
      });
    } else if (type === 'checklist') {
      this.note.sections.push({
        id: this.note.sections.length,
        type,
        checkList: [
          {
            checked: false,
            value: '',
            id: 0,
          },
        ],
        textArea: { value: '' },
      });
    }
  }

  public updateTextAreaSection(
    content: ITextAreaSection,
    sectionId: number
  ): void {
    const sectionIndx = this.note.sections.findIndex(
      (section) => section.id === sectionId
    );
    this.note.sections[sectionIndx].textArea = content;
  }

  public updateChecklistSection(
    content: ICheckListSection[],
    sectionId: number
  ): void {
    const sectionIndx = this.note.sections.findIndex(
      (section) => section.id === sectionId
    );
    this.note.sections[sectionIndx].checkList = content;
  }

  private get isNoteEmpty(): boolean {
    if (this.note.title?.length === 0 && this.note.sections.length === 0) {
      return true;
    }
    return false;
  }
}
