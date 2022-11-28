import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSelectionComponent } from './box-selection.component';

describe('BoxSelectionComponent', () => {
  let component: BoxSelectionComponent;
  let fixture: ComponentFixture<BoxSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
