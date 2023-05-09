import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTextAreaComponent } from './note-text-area.component';

describe('NoteTextAreaComponent', () => {
  let component: NoteTextAreaComponent;
  let fixture: ComponentFixture<NoteTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
