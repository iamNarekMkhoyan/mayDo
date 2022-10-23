import { ToastAlertService } from './../../../shared/services/toast-alert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { map, Subject, takeUntil } from 'rxjs';

import { INote } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public notes: INote[] = [];
  private unSubscribe$: Subject<Object> = new Subject();

  constructor(
    private router: Router,
    private translatePipe: TranslatePipe,
    private toastAlert: ToastAlertService,
    private dbService: NgxIndexedDBService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.toastAlert.emptyDeleted
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((res) => this.alertOnEmpty(res));
    this.dbService
      .getAll<INote>('notes')
      .pipe(
        takeUntil(this.unSubscribe$),
        map((notes) =>
          notes.sort(
            (a, b) => b.dateTimeEdited.getTime() - a.dateTimeEdited.getTime()
          )
        )
      )
      .subscribe((res) => {
        this.notes = res;
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next({});
    this.unSubscribe$.complete();
  }

  public createNewNote(): void {
    this.dbService
      .add('notes', {
        title: '',
        sections: [],
        dateTimeEdited: new Date(),
      })
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((res) => {
        this.router.navigate(['/notes', res.id]);
      });
  }

  public clearDB() {
    this.dbService
      .clear('notes')
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((isClear) => (this.notes = isClear ? [] : this.notes));
  }

  private async alertOnEmpty(alert: boolean): Promise<any> {
    if (alert) {
      const toast = await this.toastController.create({
        message: this.translatePipe.transform('Empty note discarded'),
        duration: 2000,
        position: 'top',
        icon: 'trash-outline',
      });

      await toast.present();
      this.toastAlert.emptyDeleted.next(false);
    }
  }
}
