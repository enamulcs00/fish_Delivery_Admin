import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminEditComponent } from './manage-admin-edit.component';

describe('ManageAdminEditComponent', () => {
  let component: ManageAdminEditComponent;
  let fixture: ComponentFixture<ManageAdminEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
