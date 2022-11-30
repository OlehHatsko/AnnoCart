import { Component, ElementRef, HostBinding, HostListener } from '@angular/core';
import { InfoBlockComponent } from '../info-block/info-block.component';
import { ISelection } from '../ts/ISelection';
import { SelectionType } from '../ts/SelectionType';

@Component({
  selector: 'point-selection',
  templateUrl: './point-selection.component.html',
  styleUrls: ['./point-selection.component.scss']
})
export class PointSelectionComponent implements ISelection {
  @HostBinding('class')
  elementClass: string;
  
  initialPoint: {
    pointX: number;
    pointY: number;
  }

  isShowAllEnabled = false;
  id: number;
  selectionType = SelectionType.point;
  infoBlock: InfoBlockComponent;

  constructor (public elRef: ElementRef) {
    console.log(elRef);
  }

  public show() {
    this.elementClass = '';
  }

  public hide() {
    this.elementClass = 'hoverable-selection';
  }

  @HostListener('click')
  public clicked(): void {
    this.infoBlock.turnEditModeOn();
  }

  @HostListener('mouseenter')
  public mouseenterListener(): void {
    this.infoBlock.show();
  }

  @HostListener('mouseleave')
  public mouseleaveListener(): void {
    if (!this.infoBlock.isEditModeOn) {
      this.infoBlock.hide();
    }
  }

}
