import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckcategoryComponent } from './truckcategory.component';

describe('TruckcategoryComponent', () => {
  let component: TruckcategoryComponent;
  let fixture: ComponentFixture<TruckcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
