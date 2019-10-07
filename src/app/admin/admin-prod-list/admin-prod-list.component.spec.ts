import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdListComponent } from './admin-prod-list.component';

describe('AdminProdListComponent', () => {
  let component: AdminProdListComponent;
  let fixture: ComponentFixture<AdminProdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
