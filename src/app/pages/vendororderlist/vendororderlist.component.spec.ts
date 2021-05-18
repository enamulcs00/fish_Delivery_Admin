import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendororderlistComponent } from './vendororderlist.component';

describe('VendororderlistComponent', () => {
  let component: VendororderlistComponent;
  let fixture: ComponentFixture<VendororderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendororderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendororderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
