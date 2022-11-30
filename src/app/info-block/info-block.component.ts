import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ImageWorkzoneComponent } from '../image-workzone/image-workzone.component';
import { ISelection } from '../ts/ISelection';
import { IShowable } from '../ts/IShowable';
import { SelectionType } from '../ts/SelectionType';

@Component({
  selector: 'info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements IShowable {
  selectionId: number;
  selectionType: SelectionType;

  isEditModeOn = true;

  private showable: ISelection;

  imageWokzone: ImageWorkzoneComponent;

  @ViewChild('selectionNameElement') selectionNameElement: ViewContainerRef;
  @ViewChild('selectionNameEditableElement') selectionNameEditableElement: ElementRef<HTMLInputElement>;
  @ViewChild('selectionDescriptionElement') selectionDescriptionElement: ViewContainerRef;
  @ViewChild('selectionDescriptionEditableElement') selectionDescriptionEditableElement: ElementRef<HTMLTextAreaElement>;

  selectionName = '';
  selectionDescription = '';

  constructor(private elRef: ElementRef) {
    this.hide();
  }

  public setFields(selectionId: number, selection: ISelection) {
    this.selectionId = selectionId;
    this.selectionType = selection.selectionType;

    this.showable = selection;
  }

  public hide() {
    this.elRef.nativeElement.style.setProperty('visibility', 'hidden');
  }

  public show() {
    this.elRef.nativeElement.style.setProperty('visibility', 'visible');
  }

  public saveCommand() {
    this.selectionName = this.selectionNameEditableElement.nativeElement.value;
    this.selectionDescription = this.selectionDescriptionEditableElement.nativeElement.value;

    this.showable.infoBlock = this;

    if (!this.showable.isShowAllEnabled) {
      this.showable.hide();
    }
    this.hide()

    this.isEditModeOn = false;
  }

  public deleteCommand() {
    this.imageWokzone.deleteSelection(this);
  }

  public turnEditModeOn() {
    this.isEditModeOn = true;
    this.showable.show();
    this.show()
  }

  public setImageWorkzoneComponent(value: ImageWorkzoneComponent) {
    this.imageWokzone = value;
  }
}
