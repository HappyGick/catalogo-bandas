import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBandComponent } from './new-band.component';

describe('NewBandComponent', () => {
  let component: NewBandComponent;
  let fixture: ComponentFixture<NewBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
