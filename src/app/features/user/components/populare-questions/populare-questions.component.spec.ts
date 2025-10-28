import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulareQuestionsComponent } from './populare-questions.component';

describe('PopulareQuestionsComponent', () => {
  let component: PopulareQuestionsComponent;
  let fixture: ComponentFixture<PopulareQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulareQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulareQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
