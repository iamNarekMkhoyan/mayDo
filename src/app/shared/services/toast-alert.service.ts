import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastAlertService {
  private _emptyDeleted$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get emptyDeleted(): BehaviorSubject<boolean> {
    return this._emptyDeleted$;
  }

  constructor() {}
}
