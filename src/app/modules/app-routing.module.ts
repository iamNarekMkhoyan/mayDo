import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteComponent } from '@base/feature/note/note.component';
import { NoteModule } from '@base/feature/note/note.module';
import { HomeComponent } from '@base/layout/home/home.component';
import { HomeModule } from '@base/layout/home/home.module';

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

@NgModule({
  imports: [HomeModule, NoteModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
