import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenApparelComponent } from './women-apparel.component';

describe('WomenApparelComponent', () => {
  let component: WomenApparelComponent;
  let fixture: ComponentFixture<WomenApparelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenApparelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenApparelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
