import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { NoteControlsComponent } from './note-controls.component';

@NgModule({
  declarations: [NoteControlsComponent],
  imports: [CommonModule, IonicModule],
  exports: [NoteControlsComponent],
})
export class NoteControlsModule {}
