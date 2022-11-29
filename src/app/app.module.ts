import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataService } from './data-service/dataService';
import { ImageWorkzoneComponent } from './image-workzone/image-workzone.component';
import { BoxSelectionComponent } from './box-selection/box-selection.component';
import { InfoBlockComponent } from './info-block/info-block.component';
import { PointSelectionComponent } from './point-selection/point-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageWorkzoneComponent,
    BoxSelectionComponent,
    InfoBlockComponent,
    PointSelectionComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
