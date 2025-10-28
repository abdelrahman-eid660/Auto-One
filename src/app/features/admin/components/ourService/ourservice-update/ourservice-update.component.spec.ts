import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurserviceUpdateComponent } from './ourservice-update.component';

describe('OurserviceUpdateComponent', () => {
  let component: OurserviceUpdateComponent;
  let fixture: ComponentFixture<OurserviceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurserviceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurserviceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
