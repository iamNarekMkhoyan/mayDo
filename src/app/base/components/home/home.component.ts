import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subject, takeUntil } from 'rxjs';
import { INote } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public notes: INote[] = [];
  private unSubscribe: Subject<Object> = new Subject();

  constructor(private router: Router, private dbService: NgxIndexedDBService) {}

  ngOnInit(): void {
    this.dbService
      .getAll('notes')
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((res) => (this.notes = res as INote[]));
  }

  ngOnDestroy(): void {
    this.unSubscribe.next({});
    this.unSubscribe.complete();
  }

  public createNewNote(): void {
    this.dbService
      .add('notes', {
        title: 'adsa',
      })
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((res) => {
        this.router.navigate(['/notes', res.id]);
      });
  }

  public clearDB() {
    this.dbService
      .clear('notes')
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((isClear) => (this.notes = isClear ? [] : this.notes));
  }
}
