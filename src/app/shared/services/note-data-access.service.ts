import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Note } from "@shared/interfaces/note.interface";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NoteDataAccessService {
  constructor(private indexedDB: NgxIndexedDBService) {}

  public getAllSortedNotes(): Observable<Note[]> {
    return this.indexedDB
      .getAll<Note>("notes")
      .pipe(map((notes) => notes.sort((a, b) => b.dateTimeEdited.getTime() - a.dateTimeEdited.getTime())));
  }

  public getNoteById(id: number): Observable<Note> {
    return this.indexedDB.getByKey("notes", id);
  }

  public addNewNote(): Observable<Note> {
    return this.indexedDB.add("notes", new Note());
  }

  public updateNote(note: Note): Observable<Note> {
    return this.indexedDB.update<Note>("notes", note);
  }

  public deleteNoteById(id: number): Observable<boolean> {
    return this.indexedDB.deleteByKey("notes", id);
  }
}
