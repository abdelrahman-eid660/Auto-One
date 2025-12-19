import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersProductUpdateComponent } from './customers-product-update.component';

describe('CustomersProductUpdateComponent', () => {
  let component: CustomersProductUpdateComponent;
  let fixture: ComponentFixture<CustomersProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersProductUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
