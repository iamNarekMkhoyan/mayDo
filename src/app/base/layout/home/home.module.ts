import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { NoteWidgetModule } from '../../ui/renderers/note-widget/note-widget.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    NoteWidgetModule,
    DirectivesModule
  ],
  exports: [HomeComponent],
  providers: [TranslatePipe],
})
export class HomeModule {}
