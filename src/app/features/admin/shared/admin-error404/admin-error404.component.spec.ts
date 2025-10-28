import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminError404Component } from './admin-error404.component';

describe('AdminError404Component', () => {
  let component: AdminError404Component;
  let fixture: ComponentFixture<AdminError404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminError404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminError404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
