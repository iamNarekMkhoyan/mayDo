import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from "@angular/core";
import { App } from "@capacitor/app";
import { takeUntil } from "rxjs";

import { NoteDataAccessService } from "@shared/services/note-data-access.service";
import { EMPTY_NOTELIST, PLUS_ICON } from "@shared/constants/images.constant";
import { ToastAlertService } from "@shared/services/toast-alert.service";
import { SharedComponent } from "@shared/component/shared.component";
import { Note } from "@shared/interfaces/note.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends SharedComponent implements OnInit, OnDestroy {
  PLUS = PLUS_ICON;
  EMPTY_NOTES = EMPTY_NOTELIST;
  public notes: Note[] = [];

  constructor(
    private noteDataAccessService: NoteDataAccessService,
    private toastAlert: ToastAlertService,
    protected override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.platform.backButton.pipe(takeUntil(this.unsubNotifier$)).subscribe(() => {
      App.exitApp();
    });

    this.noteDataAccessService
      .getAllSortedNotes()
      .pipe(takeUntil(this.unsubNotifier$))
      .subscribe((notes) => {
        this.notes = notes;
        this.cdr.markForCheck();
      });

    this.toastAlert.emptyDeleted.pipe(takeUntil(this.unsubNotifier$)).subscribe((res) => {
      if (res) {
        this.toastAlert.createToastAlert("Empty note discarded", 2000, "top", "trash-outline");
        this.toastAlert.emptyDeleted.next(false);
      }
    });
  }

  public createNewNote(): void {
    this.noteDataAccessService
      .addNewNote()
      .pipe(takeUntil(this.unsubNotifier$))
      .subscribe((newNote) => {
        this.router.navigate(["/notes", newNote.id]);
      });
  }
}
