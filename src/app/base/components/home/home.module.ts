import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NoteWidgetModule } from '../note-widget/note-widget.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    NoteWidgetModule,
  ],
  exports: [HomeComponent],
  providers: [TranslatePipe],
})
export class HomeModule {}
