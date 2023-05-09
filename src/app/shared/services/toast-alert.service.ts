import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { TranslatePipe } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

type IonToastPositionTypes = "top" | "bottom" | "middle" | undefined;

@Injectable({
  providedIn: "root",
})
export class ToastAlertService {
  private _emptyDeleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get emptyDeleted(): BehaviorSubject<boolean> {
    return this._emptyDeleted$;
  }

  constructor(private toastController: ToastController, private translatePipe: TranslatePipe) {}

  /**
   * @param message message to be translated and displayed in the toast
   * @param duration duration of the toast display in milliseconds
   * @param position position of the toast "top" | "bottom" | "middle" | undefined
   * @param icon ion-icon, path to a valid SVG file or undefined
   */
  public async createToastAlert(
    message: string,
    duration: number = 3000,
    position: IonToastPositionTypes = "top",
    icon: string | undefined
  ): Promise<any> {
    const toast = await this.toastController.create({
      message: this.translatePipe.transform(message),
      duration: duration,
      position: position,
      icon: icon,
    });

    await toast.present();
  }
}
