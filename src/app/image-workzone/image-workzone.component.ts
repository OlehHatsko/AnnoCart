import { Component, ComponentRef, ElementRef, EventEmitter, Inject, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { BoxSelectionComponent } from '../box-selection/box-selection.component';
import { DataService } from '../data-service/dataService';

@Component({
  selector: 'image-workzone',
  templateUrl: './image-workzone.component.html',
  styleUrls: ['./image-workzone.component.scss']
})
export class ImageWorkzoneComponent {
  private file: File;

  @Output() selectionsContainerEvent = new EventEmitter<ViewContainerRef>();
  @ViewChild('selectionsContainer', { read: ViewContainerRef }) selectionsContainer: ViewContainerRef;

  emptyTextElement: JQuery<HTMLElement>;
  imageBlockElement: JQuery<HTMLElement>;

  public isImageLoaded = false;

  private isSquareSelectionCreatingEnabled = false;

  private components = new Array<ComponentRef<BoxSelectionComponent>>();

  constructor(private dataService: DataService, private elementRef: ElementRef) {
    this.dataService.currentFile.subscribe(file => this.file = file);
  }

  public setFile(file: File) {
    if (file != null) {
      if (file.type.split('/')[0] == 'image') {
        this.file = file;
        this.isImageLoaded = true;
        this.showImageElement();
      }
      else {
        this.showWrongFormatMessage();
        this.showTextElement();
      }
    }
  }

  public createBoxSelection() {
    this.isSquareSelectionCreatingEnabled = true;
  }

  ngAfterViewInit() {
    this.emptyTextElement = $('.image-workzone-block__empty-message');
    this.imageBlockElement = $('.image-workzone-block__image-block');

    this.imageBlockElement.hide();
  }

  ngOnInit() {
    this.dataService.currentFile.subscribe(file => this.setFile(file));
  }

  startDragging(event: MouseEvent) {
    if (this.isSquareSelectionCreatingEnabled) {

      let createdComponent = this.selectionsContainer.createComponent(BoxSelectionComponent);
      let createdComponentStyle = createdComponent.instance.elRef.nativeElement.style;

      createdComponent.instance.initialPoint = { pointX: event.offsetX + 15, pointY: event.offsetY + 15 };

      createdComponentStyle.setProperty('top', this.formatToPx(createdComponent.instance.initialPoint.pointY));
      createdComponentStyle.setProperty('left', this.formatToPx(createdComponent.instance.initialPoint.pointX));

      this.components.push(createdComponent);

      document.addEventListener('mousemove', event => this.documentDragging(event))
      document.addEventListener('mouseup', this.finishDragging);
    }
  }

  finishDragging() {
    if (this.isSquareSelectionCreatingEnabled) {
      this.isSquareSelectionCreatingEnabled = false;

      this.components[this.components.length - 1].instance.makeHoverable();

      document.removeEventListener('mousemove', event => this.documentDragging(event))
      document.removeEventListener('mouseup', this.finishDragging);
    }
  }

  private documentDragging(event: MouseEvent) {
    if (this.isSquareSelectionCreatingEnabled) {
      let coorY = event.clientY - this.imageBlockElement.offset().top;
      let coorX = event.clientX - this.imageBlockElement.offset().left;

      let createdComponent = this.components[this.components.length - 1];
      createdComponent.instance.updateSizing(coorX, coorY, this.imageBlockElement.width(), this.imageBlockElement.height());
    }
  }

  private showTextElement() {
    this.emptyTextElement.show();
    this.imageBlockElement.hide();
  }

  private formatToPx = (input: any) => input + 'px';

  private showImageElement() {
    this.emptyTextElement.hide();
    this.imageBlockElement.show();

    let url = URL.createObjectURL(this.file);
    let image = <HTMLImageElement>document.createElement('img');
    image.src = url;
    let imgParentBlock = this.imageBlockElement;
    let chSizesFunc = this.changeSizes;

    image.onload = function () {
      chSizesFunc(image.width, image.height, imgParentBlock);
    }
    this.imageBlockElement.css('background-image', `url(${url})`);
    this.elementRef.nativeElement.style.setProperty('min-width', 'auto');
  }

  private changeSizes(imgW: number, imgH: number, imgParentBlock: JQuery<HTMLElement>) {
    let workzone = $('.workzone');
    let imageAspect = imgH / imgW;
    let blockAspect = workzone.height() / workzone.width();

    if (blockAspect > imageAspect) {
      imgParentBlock.height(workzone.width() * imageAspect - (40 * workzone.width() * imageAspect) / workzone.width());
      imgParentBlock.width(workzone.width() - 40);
    } else {
      imgParentBlock.height(workzone.height() - 40);
      imgParentBlock.width(workzone.height() / imageAspect - (40 * workzone.height() / imageAspect) / workzone.height());
    }
  }

  private showWrongFormatMessage() {
    let wrongFormatMessage = 'Wrong file format!<br/> Choose image';
    this.emptyTextElement.addClass('error-message');
    this.emptyTextElement.html(wrongFormatMessage);
  }
}
