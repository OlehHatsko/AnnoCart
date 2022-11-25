import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataService } from './data-service/dataService';
import { ImageWorkzoneComponent } from './image-workzone/image-workzone.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageWorkzoneComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
