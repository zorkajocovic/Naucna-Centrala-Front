import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeArticleComponent } from './make-article.component';

describe('MakeArticleComponent', () => {
  let component: MakeArticleComponent;
  let fixture: ComponentFixture<MakeArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
