import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrderdsComponent } from './profile-orderds.component';

describe('ProfileOrderdsComponent', () => {
  let component: ProfileOrderdsComponent;
  let fixture: ComponentFixture<ProfileOrderdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOrderdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileOrderdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
