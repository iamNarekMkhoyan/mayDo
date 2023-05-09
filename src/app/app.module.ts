import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';

import { TranslationModule } from './modules/translation.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { IndexedDBModule } from './modules/indexedDb.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IndexedDBModule,
    TranslationModule,
  ],
  providers: [ScreenOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}
