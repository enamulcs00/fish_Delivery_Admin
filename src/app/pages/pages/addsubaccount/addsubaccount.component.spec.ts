import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubaccountComponent } from './addsubaccount.component';

describe('AddsubaccountComponent', () => {
  let component: AddsubaccountComponent;
  let fixture: ComponentFixture<AddsubaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
