import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheflistComponent } from './cheflist.component';

describe('CheflistComponent', () => {
  let component: CheflistComponent;
  let fixture: ComponentFixture<CheflistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheflistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheflistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
