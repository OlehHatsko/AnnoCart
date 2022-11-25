import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWorkzoneComponent } from './image-workzone.component';

describe('ImageWorkzoneComponent', () => {
  let component: ImageWorkzoneComponent;
  let fixture: ComponentFixture<ImageWorkzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageWorkzoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageWorkzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
