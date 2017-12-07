import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenApparelComponent } from './men-apparel.component';

describe('MenApparelComponent', () => {
  let component: MenApparelComponent;
  let fixture: ComponentFixture<MenApparelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenApparelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenApparelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
