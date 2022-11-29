import { Component, ComponentRef, ElementRef, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { BoxSelectionComponent } from './box-selection/box-selection.component';
import { DataService } from './data-service/dataService';
import { ImageWorkzoneComponent } from './image-workzone/image-workzone.component';
import { InfoBlockComponent } from './info-block/info-block.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ImageWorkzoneComponent) selectionsContainer: ImageWorkzoneComponent;
  @ViewChild('workzone', { read: ViewContainerRef }) workzone: ViewContainerRef;

  title = 'AnnoCart';
  private file: File;

  emptyTextElement: JQuery<HTMLElement>;

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.emptyTextElement = $('.image-workzone-block__empty-message');

    console.log(this.workzone);
  }

  selectImageButtonPressed() {
    var input = <HTMLInputElement>document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => {
      var htmlInputElement = <HTMLInputElement>e.target;
      this.file = htmlInputElement!.files[0];
      this.dataService.changeFile(this.file);
    }
  }

  selectSquereRegionButtonPressed() {
    if(!this.selectionsContainer.isImageLoaded){
      this.showErrorMessage('Load image first!');
      return;
    }

    let createdInfoBlock = this.workzone.createComponent(InfoBlockComponent);
    this.selectionsContainer.createBoxSelection(createdInfoBlock);
  }

  selectPointPressed() {
    alert('selectPointPressed');
  }

  showAll() {
    this.selectionsContainer.toggleAll();
  }

  makeSelectionsRed() {

  }

  makeSelectionsBlue() {

  }

  private showErrorMessage(message: string)
  {
    this.emptyTextElement.addClass('error-message');
    this.emptyTextElement.html(message);
  }
}
