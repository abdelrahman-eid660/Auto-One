import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUpdateComponent } from './blog-update.component';

describe('BlogUpdateComponent', () => {
  let component: BlogUpdateComponent;
  let fixture: ComponentFixture<BlogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
