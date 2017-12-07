import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BathBodyComponent } from './bath-body.component';

describe('BathBodyComponent', () => {
  let component: BathBodyComponent;
  let fixture: ComponentFixture<BathBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BathBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BathBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
