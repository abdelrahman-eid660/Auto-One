import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurserviceCreateComponent } from './ourservice-create.component';

describe('OurserviceCreateComponent', () => {
  let component: OurserviceCreateComponent;
  let fixture: ComponentFixture<OurserviceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurserviceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurserviceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
