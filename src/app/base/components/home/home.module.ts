import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoteWidgetModule } from '../note-widget/note-widget.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, IonicModule, TranslateModule, NoteWidgetModule, RouterModule],
  exports: [HomeComponent],
})
export class HomeModule {}
