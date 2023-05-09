import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Subject } from "rxjs";

@Component({
  selector: "app-shared",
  templateUrl: "./shared.component.html",
  styleUrls: ["./shared.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedComponent implements OnDestroy {
  public unsubNotifier$: Subject<null> = new Subject();
  public indexedDB: NgxIndexedDBService = this.injector.get(NgxIndexedDBService);
  public cdr: ChangeDetectorRef = this.injector.get(ChangeDetectorRef);
  public platform: Platform = this.injector.get(Platform);
  public router: Router = this.injector.get(Router);

  constructor(protected readonly injector: Injector) {}

  ngOnDestroy(): void {
    this.unsubNotifier$.next(null);
    this.unsubNotifier$.complete();
  }
}
