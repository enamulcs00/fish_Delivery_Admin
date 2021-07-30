import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacycmsComponent } from './privacycms.component';

describe('PrivacycmsComponent', () => {
  let component: PrivacycmsComponent;
  let fixture: ComponentFixture<PrivacycmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacycmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacycmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
