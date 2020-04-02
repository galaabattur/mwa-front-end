import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleWishComponent } from './sample-wish.component';

describe('SampleWishComponent', () => {
  let component: SampleWishComponent;
  let fixture: ComponentFixture<SampleWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
