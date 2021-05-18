import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceditComponent } from './geofencedit.component';

describe('GeofenceditComponent', () => {
  let component: GeofenceditComponent;
  let fixture: ComponentFixture<GeofenceditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
