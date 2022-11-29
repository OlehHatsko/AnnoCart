import { Component, ElementRef, HostBinding, HostListener } from '@angular/core';
import { InfoBlockComponent } from '../info-block/info-block.component';
import { ISelection } from '../ts/ISelection';
import { SelectionType } from '../ts/SelectionType';

@Component({
  selector: 'box-selection',
  templateUrl: './box-selection.component.html',
  styleUrls: ['./box-selection.component.scss']
})
export class BoxSelectionComponent implements ISelection {
  @HostBinding('class')
  elementClass: string;

  initialPoint: {
    pointX: number;
    pointY: number;
  }

  selectionType = SelectionType.box;
  id: number;
  isShowAllEnabled = false;

  infoBlock: InfoBlockComponent;

  constructor(public elRef: ElementRef) {
  }

  public show() {
    this.elementClass = '';
  }

  public hide() {
    this.elementClass = 'hoverable-selection';
  }

  public updateSizing(mouseX: number, mouseY: number, parentWidth: number, parentHeight: number) {
    let style = this.elRef.nativeElement.style;
    let height: number, width: number, top: number, left: number;

    let maxTop: number, maxLeft: number, maxBottom: number, maxRight: number;

    if (mouseX > this.initialPoint.pointX && mouseY > this.initialPoint.pointY) {
      maxBottom = parentHeight - this.initialPoint.pointY;
      maxRight = parentWidth - this.initialPoint.pointX;

      top = this.initialPoint.pointY;
      left = this.initialPoint.pointX;

      height = Math.min(mouseY - this.initialPoint.pointY, maxBottom);
      width = Math.min(mouseX - this.initialPoint.pointX, maxRight)
    }
    else if (mouseX < this.initialPoint.pointX && mouseY < this.initialPoint.pointY) {
      maxTop = this.initialPoint.pointY - 15;
      maxLeft = this.initialPoint.pointX - 15;

      top = Math.max(mouseY, 15);
      left = Math.max(mouseX, 15);

      height = Math.min(this.initialPoint.pointY - mouseY, maxTop);
      width = Math.min(this.initialPoint.pointX - mouseX, maxLeft);
    }
    else if (mouseX < this.initialPoint.pointX && mouseY > this.initialPoint.pointY) {
      maxBottom = parentHeight - this.initialPoint.pointY;
      maxLeft = this.initialPoint.pointX - 15;

      top = this.initialPoint.pointY;
      left = Math.max(mouseX, 15);;

      height = Math.min(mouseY - this.initialPoint.pointY, maxBottom);
      width = Math.min(this.initialPoint.pointX - mouseX, maxLeft);
    }
    else if (mouseX > this.initialPoint.pointX && mouseY < this.initialPoint.pointY) {
      maxTop = this.initialPoint.pointY - 15;
      maxRight = parentWidth - this.initialPoint.pointX;

      top = Math.max(mouseY, 15);
      left = this.initialPoint.pointX;

      height = Math.min(this.initialPoint.pointY - mouseY, maxTop);
      width = Math.min(mouseX - this.initialPoint.pointX, maxRight);
    }

    style.setProperty('height', this.formatToPx(height));
    style.setProperty('width', this.formatToPx(width));
    style.setProperty('left', this.formatToPx(left));
    style.setProperty('top', this.formatToPx(top));
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

  private formatToPx = (input: any) => input + 'px';
}
