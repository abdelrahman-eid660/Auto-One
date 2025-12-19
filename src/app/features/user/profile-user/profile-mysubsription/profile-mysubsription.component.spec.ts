import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMysubsriptionComponent } from './profile-mysubsription.component';

describe('ProfileMysubsriptionComponent', () => {
  let component: ProfileMysubsriptionComponent;
  let fixture: ComponentFixture<ProfileMysubsriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMysubsriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMysubsriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
