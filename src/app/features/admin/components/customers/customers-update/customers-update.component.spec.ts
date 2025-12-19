import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersUpdateComponent } from './customers-update.component';

describe('CustomersUpdateComponent', () => {
  let component: CustomersUpdateComponent;
  let fixture: ComponentFixture<CustomersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
