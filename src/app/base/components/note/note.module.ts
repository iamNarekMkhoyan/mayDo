import { NoteComponent } from './note.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NoteComponent],
  imports: [CommonModule, IonicModule],
  exports: [NoteComponent],
})
export class NoteModule {}
