import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefEditorComponent } from './chief-editor.component';

describe('ChiefEditorComponent', () => {
  let component: ChiefEditorComponent;
  let fixture: ComponentFixture<ChiefEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
