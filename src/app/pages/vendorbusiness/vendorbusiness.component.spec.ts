import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorbusinessComponent } from './vendorbusiness.component';

describe('VendorbusinessComponent', () => {
  let component: VendorbusinessComponent;
  let fixture: ComponentFixture<VendorbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
