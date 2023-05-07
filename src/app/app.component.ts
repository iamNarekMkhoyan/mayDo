import { Component } from '@angular/core';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private screenOrientation: ScreenOrientation) {
    this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .catch((err) => {
        return console.warn(err, 'From capacitor orientation lock plugin');
      });
  }
}
