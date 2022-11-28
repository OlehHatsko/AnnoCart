import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataService } from './data-service/dataService';
import { ImageWorkzoneComponent } from './image-workzone/image-workzone.component';
import { BoxSelectionComponent } from './box-selection/box-selection.component';
import { InfoBlockComponent } from './info-block/info-block.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageWorkzoneComponent,
    BoxSelectionComponent,
    InfoBlockComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
