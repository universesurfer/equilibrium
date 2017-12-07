import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageComponent } from './vintage.component';

describe('VintageComponent', () => {
  let component: VintageComponent;
  let fixture: ComponentFixture<VintageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VintageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
