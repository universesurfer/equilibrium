import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGardenComponent } from './home-garden.component';

describe('HomeGardenComponent', () => {
  let component: HomeGardenComponent;
  let fixture: ComponentFixture<HomeGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
