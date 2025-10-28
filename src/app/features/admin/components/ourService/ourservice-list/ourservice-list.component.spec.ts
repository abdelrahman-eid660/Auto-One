import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurserviceListComponent } from './ourservice-list.component';

describe('OurserviceListComponent', () => {
  let component: OurserviceListComponent;
  let fixture: ComponentFixture<OurserviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurserviceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
