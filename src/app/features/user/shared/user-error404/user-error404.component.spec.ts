import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserError404Component } from './user-error404.component';

describe('UserError404Component', () => {
  let component: UserError404Component;
  let fixture: ComponentFixture<UserError404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserError404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserError404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
