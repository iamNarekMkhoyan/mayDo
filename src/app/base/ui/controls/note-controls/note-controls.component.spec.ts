import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteControlsComponent } from './note-controls.component';

describe('NoteControlsComponent', () => {
  let component: NoteControlsComponent;
  let fixture: ComponentFixture<NoteControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
