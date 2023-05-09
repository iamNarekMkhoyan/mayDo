import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteChecklistComponent } from './note-checklist.component';

describe('NoteChecklistComponent', () => {
  let component: NoteChecklistComponent;
  let fixture: ComponentFixture<NoteChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
