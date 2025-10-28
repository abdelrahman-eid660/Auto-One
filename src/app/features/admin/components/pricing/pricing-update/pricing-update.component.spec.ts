import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingUpdateComponent } from './pricing-update.component';

describe('PricingUpdateComponent', () => {
  let component: PricingUpdateComponent;
  let fixture: ComponentFixture<PricingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
