import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subject, switchMap, takeUntil } from 'rxjs';

import {
  ICheckListSection,
  INote,
  ITextAreaSection,
} from 'src/app/shared/models/note.model';
import { sectionType, SectionTypes } from './note.model';
import { ToastAlertService } from 'src/app/shared/services/toast-alert.service';
import { EMPTY_SECTIONS } from 'src/app/shared/constants/images.const';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnDestroy {
  EMPTY_SECTIONS = EMPTY_SECTIONS;
  public note!: INote;
  public SECTION_TYPES = SectionTypes;
  public sectionDeletionActive: boolean = false;
  public deletionReadySections: number[] = [];
  private sub$: Subject<Object> = new Subject();

  @Output() emptyDeleted: EventEmitter<void> = new EventEmitter<void>();

  get deletionDisable(): boolean {
    return this.deletionReadySections.length > 0;
  }

  constructor(
    private router: Router,
    private platform: Platform,
    private activeRoute: ActivatedRoute,
    private toastAlert: ToastAlertService,
    private dbService: NgxIndexedDBService
  ) {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.navigateBack();
    });
  }

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
      this.updateNote();
    }
  }

  public deleteNote(id: number): void {
    this.dbService
      .deleteByKey('notes', id)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => this.router.navigate(['../']));
  }

  public addSection(type: sectionType): void {
    if (type === 'TEXT') {
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
    } else if (type === 'CHECKLIST') {
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

  public toggleSectionDeletion(): void {
    this.sectionDeletionActive = !this.sectionDeletionActive;
    this.deletionReadySections = [];
  }

  public selectSection(sectionId: number): void {
    if (this.deletionReadySections.includes(sectionId)) {
      const index = this.deletionReadySections.indexOf(sectionId);
      this.deletionReadySections.splice(index, 1);
    } else {
      this.deletionReadySections.push(sectionId);
    }
  }

  public deleteSections(): void {
    const remainingSections = this.note.sections.filter(
      (section) => !this.deletionReadySections.includes(section.id)
    );
    this.note.sections = remainingSections;
    this.dbService
      .update('notes', this.note)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => this.toggleSectionDeletion());
  }

  private get isNoteEmpty(): boolean {
    if (this.note.title?.length === 0 && this.note.sections.length === 0) {
      return true;
    }
    return false;
  }

  private updateNote(): void {
    this.dbService
      .update('notes', this.note)
      .pipe(takeUntil(this.sub$))
      .subscribe();
  }
}
