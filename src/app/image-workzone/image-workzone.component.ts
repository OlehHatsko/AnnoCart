import { Component, ComponentRef, ElementRef, EventEmitter, Inject, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { BoxSelectionComponent } from '../box-selection/box-selection.component';
import { DataService } from '../data-service/dataService';
import { InfoBlockComponent } from '../info-block/info-block.component';
import { PointSelectionComponent } from '../point-selection/point-selection.component';
import { ISelection } from '../ts/ISelection';
import { SelectionType } from '../ts/SelectionType';

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
  public areAllVisible = false;
  private isSquareSelectionCreatingEnabled = false;
  private isPointSelectionCreatingEnabled = false;

  private infoBlocks = new Array<ComponentRef<InfoBlockComponent>>();
  private components = new Array<ComponentRef<ISelection>>();

  constructor(private dataService: DataService, private elementRef: ElementRef) {
    this.dataService.currentFile.subscribe(file => this.file = file);
  }

  public setFile(file: File) {
    if (file != null) {
      if (file.type.split('/')[0] == 'image') {
        this.file = file;
        this.isImageLoaded = true;
        this.showImageElement();
        this.components.forEach(x => x.destroy());
        this.infoBlocks.forEach(x => x.destroy());
        this.components = new Array<ComponentRef<ISelection>>();
        this.infoBlocks = new Array<ComponentRef<InfoBlockComponent>>();
      }
      else {
        this.showWrongFormatMessage();
        this.showTextElement();
      }
    }
  }

  public createBoxSelection(infoBlock: ComponentRef<InfoBlockComponent>) {
    this.infoBlocks.push(infoBlock);
    infoBlock.instance.setImageWorkzoneComponent(this);
    this.isSquareSelectionCreatingEnabled = true;
  }

  public createPointSelection(infoBlock: ComponentRef<InfoBlockComponent>) {
    this.infoBlocks.push(infoBlock);
    infoBlock.instance.setImageWorkzoneComponent(this);
    this.isPointSelectionCreatingEnabled = true;
  }

  public initPointSelection(event: MouseEvent) {
    if (this.isPointSelectionCreatingEnabled) {
      let createdComponent = this.selectionsContainer.createComponent(PointSelectionComponent);
      createdComponent.instance.isShowAllEnabled = this.areAllVisible;
      createdComponent.instance.id = this.components.length;

      let createdComponentStyle = createdComponent.instance.elRef.nativeElement.style;

      createdComponent.instance.initialPoint = { pointX: event.offsetX, pointY: event.offsetY };

      console.log(createdComponent.instance.initialPoint);


      createdComponentStyle.setProperty('top', this.formatToPx(createdComponent.instance.initialPoint.pointY));
      createdComponentStyle.setProperty('left', this.formatToPx(createdComponent.instance.initialPoint.pointX));

      this.components.push(createdComponent);

      this.isPointSelectionCreatingEnabled = false;

      let comp = this.components[this.components.length - 1].instance;

      this.infoBlocks[this.infoBlocks.length - 1].instance.setFields(this.components.length - 1, comp);
      this.infoBlocks[this.infoBlocks.length - 1].instance.show();
    }
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
      createdComponent.instance.isShowAllEnabled = this.areAllVisible;
      createdComponent.instance.id = this.components.length;

      let createdComponentStyle = createdComponent.instance.elRef.nativeElement.style;

      createdComponent.instance.initialPoint = { pointX: event.offsetX + 15, pointY: event.offsetY + 15 };

      createdComponentStyle.setProperty('top', this.formatToPx(createdComponent.instance.initialPoint.pointY));
      createdComponentStyle.setProperty('left', this.formatToPx(createdComponent.instance.initialPoint.pointX));

      this.components.push(createdComponent);

      document.addEventListener('mousemove', this.dragLambda)
      document.addEventListener('mouseup', this.finishDragging);
    }
  }

  finishDragging = () => {
    if (this.isSquareSelectionCreatingEnabled) {
      document.removeEventListener('mousemove', this.dragLambda)
      document.removeEventListener('mouseup', this.finishDragging);

      this.isSquareSelectionCreatingEnabled = false;

      this.infoBlocks[this.infoBlocks.length - 1].instance.setFields(this.components.length - 1, this.components[this.components.length - 1].instance);
      this.infoBlocks[this.infoBlocks.length - 1].instance.show();
    }
  }

  documentDragging(event: MouseEvent) {
    if (this.isSquareSelectionCreatingEnabled) {
      let coorY = event.clientY - this.imageBlockElement.offset().top;
      let coorX = event.clientX - this.imageBlockElement.offset().left;

      let createdSquareSelection = this.components[this.components.length - 1].instance as BoxSelectionComponent;
      createdSquareSelection.updateSizing(coorX, coorY, this.imageBlockElement.width(), this.imageBlockElement.height());
    }
  }

  deleteSelection(infoBlock: InfoBlockComponent) {
    let deletableInfoBlock = this.infoBlocks.filter(x => x.instance == infoBlock)[0];
    this.infoBlocks = this.infoBlocks.filter(x => x.instance != infoBlock);
    let deletableComponent = this.components.filter(x => x.instance.id == infoBlock.selectionId && x.instance.selectionType == infoBlock.selectionType)[0];


    this.components = this.components.filter(x => x.instance.id != infoBlock.selectionId || x.instance.selectionType != infoBlock.selectionType);
    deletableInfoBlock.destroy();

    deletableComponent.destroy();
  }

  public toggleAll() {
    if (!this.areAllVisible) {
      this.components.forEach(x => x.instance.show());
    }
    else {
      this.components.forEach(x => x.instance.hide());
    }

    this.areAllVisible = !this.areAllVisible;

    this.components.forEach(x => x.instance.isShowAllEnabled = this.areAllVisible);
  }

  public makeSelectionRed() {
    this.components
      .filter(x => x.instance.selectionType == SelectionType.box)
      .map(x => x.instance as BoxSelectionComponent)
      .forEach(x => x.makeRed());
  }

  public makeSelectionBlue() {
    this.components
      .filter(x => x.instance.selectionType == SelectionType.box)
      .map(x => x.instance as BoxSelectionComponent)
      .forEach(x => x.makeBlue());
  }

  private dragLambda = (event: MouseEvent) => this.documentDragging(event);

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
