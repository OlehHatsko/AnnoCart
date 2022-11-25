import { Component, Inject } from '@angular/core';
import { DataService } from './data-service/dataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AnnoCart';
  private file: File;

  constructor(private dataService: DataService) {}

  private selectImageButtonPressed() {
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
    alert('selectSquereRegionPressed');
  }

  selectPointPressed() {
    alert('selectPointPressed');
  }

  ngAfterViewInit() {
    let selectImageButton = $('#selectImage');
    let selectSquereRegionButtom = $('#selectSquereRegion');
    let selectPointButtom = $('#selectPoint');

    selectImageButton.click(this.selectImageButtonPressed.bind(this));
    selectSquereRegionButtom.click(this.selectSquereRegionButtonPressed.bind(this));
    selectPointButtom.click(this.selectPointPressed.bind(this));
  }
}
