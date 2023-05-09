import { ChangeDetectionStrategy, Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Observable, switchMap, take, takeUntil } from "rxjs";

import { ICheckListSection, ITextAreaSection, Note, NoteSection } from "@shared/interfaces/note.interface";
import { SectionType, SectionTypesEnum } from "@shared/types/note.model";
import { ToastAlertService } from "@shared/services/toast-alert.service";
import { EMPTY_SECTIONS } from "@shared/constants/images.constant";
import { SharedComponent } from "@shared/component/shared.component";
import { NoteDataAccessService } from "@shared/services/note-data-access.service";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent extends SharedComponent implements OnInit {
  EMPTY_SECTIONS = EMPTY_SECTIONS;
  public note!: Note;
  public SECTION_TYPES = SectionTypesEnum;
  public sectionDeletionActive: boolean = false;
  public deletionReadySections: number[] = [];

  public get deletionDisable(): boolean {
    return this.deletionReadySections.length > 0;
  }

  private get isNoteEmpty(): boolean {
    if (this.note.title?.length === 0 && this.note.sections.length === 0) {
      return true;
    }
    return false;
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private toastAlert: ToastAlertService,
    private noteDataAccessService: NoteDataAccessService,
    protected override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.navigateBack();
    });
    this.activeRoute.params
      .pipe(
        takeUntil(this.unsubNotifier$),
        switchMap((params: Params) => this.noteDataAccessService.getNoteById(Number(params["id"])))
      )
      .subscribe((resultNote) => {
        this.note = resultNote as Note;
        this.cdr.markForCheck();
      });
  }

  public navigateBack(): void {
    if (this.isNoteEmpty) {
      this.deleteNote(this.note.id);
      this.toastAlert.emptyDeleted.next(true);
    } else {
      this.router.navigate(["../"]);
      this.note.dateTimeEdited = new Date();
      this.updateNote().subscribe();
    }
  }

  public deleteNote(id: number): void {
    this.noteDataAccessService
      .deleteNoteById(id)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(["../"]));
  }

  public addSection(type: SectionType): void {
    if (type === "TEXT") {
      this.note.sections.push(new NoteSection(this.note.sections.length, type));
    } else if (type === "CHECKLIST") {
      this.note.sections.push(new NoteSection(this.note.sections.length, type));
    }
  }

  public updateTextAreaSection(content: ITextAreaSection, sectionId: number): void {
    const sectionIndx = this.note.sections.findIndex((section) => section.id === sectionId);
    this.note.sections[sectionIndx].textArea = content;
  }

  public updateChecklistSection(content: ICheckListSection[], sectionId: number): void {
    const sectionIndx = this.note.sections.findIndex((section) => section.id === sectionId);
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
    const remainingSections = this.note.sections.filter((section) => !this.deletionReadySections.includes(section.id));
    this.note.sections = remainingSections;
    this.updateNote().subscribe(() => this.toggleSectionDeletion());
  }

  private updateNote(): Observable<Note> {
    return this.noteDataAccessService.updateNote(this.note).pipe(take(1));
  }
}
