import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkFoodComponent } from './bulk-food.component';

describe('BulkFoodComponent', () => {
  let component: BulkFoodComponent;
  let fixture: ComponentFixture<BulkFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
