import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucklocationComponent } from './trucklocation.component';

describe('TrucklocationComponent', () => {
  let component: TrucklocationComponent;
  let fixture: ComponentFixture<TrucklocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrucklocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrucklocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
