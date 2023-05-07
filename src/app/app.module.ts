import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { AppComponent } from './app.component';
import { HomeComponent } from './base/components/home/home.component';
import { HomeModule } from './base/components/home/home.module';
import { NoteComponent } from './base/components/note/note.component';
import { NoteModule } from './base/components/note/note.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'notes/:id',
    component: NoteComponent,
  },
];

const dbConfig: DBConfig = {
  name: 'mayDo',
  version: 1,
  objectStoresMeta: [
    {
      store: 'notes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'id', keypath: 'id', options: { unique: true } }],
    },
  ],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    NgxIndexedDBModule.forRoot(dbConfig),
    HomeModule,
    NoteModule,
  ],
  providers: [ScreenOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
