import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingListComponent } from './pricing-list.component';

describe('PricingListComponent', () => {
  let component: PricingListComponent;
  let fixture: ComponentFixture<PricingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
