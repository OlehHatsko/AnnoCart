import { Component, ElementRef, Inject } from '@angular/core';
import { DataService } from '../data-service/dataService';

@Component({
  selector: 'image-workzone',
  templateUrl: './image-workzone.component.html',
  styleUrls: ['./image-workzone.component.scss']
})
export class ImageWorkzoneComponent {
  private file: File;

  emptyTextElement: JQuery<HTMLElement>;
  imageBlockElement: JQuery<HTMLElement>;

  constructor(private dataService: DataService, private elementRef: ElementRef) {
    this.dataService.currentFile.subscribe(file => this.file = file);
  }

  public setFile(file: File) {
    if (file != null) {
      if (file.type.split('/')[0] == 'image') {
        this.file = file;
        this.showImageElement();
      }
      else {
        this.showWrongFormatMessage();
        this.showTextElement();
      }
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

  private showTextElement() {
    this.emptyTextElement.show();
    this.imageBlockElement.hide();
  }

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

  // private changeSizes(imgW: number, imgH: number, imgParentBlock: JQuery<HTMLElement>) {
  //   let aspect = imgW / imgH;
  //   let workzone = $('.workzone');

  //   console.log(imgH+'X'+imgW);
  //   console.log(workzone.height()+'X'+workzone.width());
    
    

  //   if (aspect < 1) {
  //     aspect = 1 / aspect;
  //   }

  //   console.log('aspect: '+ aspect);

  //   console.log('res width: '+ (workzone.height() / aspect - 25));
  //   console.log('res height: '+ (imgW / aspect - 25));

  //   imgParentBlock.width(workzone.height() / aspect - 25);
  //   imgParentBlock.height(imgW / aspect - 25);
  // }

  private changeSizes(imgW: number, imgH: number, imgParentBlock: JQuery<HTMLElement>) {
    let workzone = $('.workzone');
    let imageAspect = imgH/imgW;
    let blockAspect = workzone.height() / workzone.width();
    console.log(imgH+'X'+imgW);
    console.log(workzone.height()+'X'+workzone.width());
    

    if(blockAspect > imageAspect) {
      

      console.log(workzone.width() * imageAspect - (40 * workzone.width() * imageAspect) / workzone.width());
      console.log(workzone.width()-40);

      imgParentBlock.height(workzone.width() * imageAspect - (40 * workzone.width() * imageAspect) / workzone.width());
      imgParentBlock.width(workzone.width()-40);
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
