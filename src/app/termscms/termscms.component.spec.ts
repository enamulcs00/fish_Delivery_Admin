import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermscmsComponent } from './termscms.component';

describe('TermscmsComponent', () => {
  let component: TermscmsComponent;
  let fixture: ComponentFixture<TermscmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermscmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermscmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
