import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryImagesRoutingModule } from './gallery-images-routing.module';
import { AddImageComponent } from './add-image/add-image.component';
import { GalleryImagesComponent } from './gallery-images.component';
import {CarouselModule} from 'primeng/carousel';
import { ImagesDetailComponent } from './images-detail/images-detail.component';
import { DndDirective } from 'src/app/shared/directives/dnd.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { GalleryImagesService } from './_services/gallery-images.service';

@NgModule({
  declarations: [
    AddImageComponent,
    GalleryImagesComponent,
    ImagesDetailComponent,
    DndDirective
  ],
  imports: [
    CommonModule,
    GalleryImagesRoutingModule,
    CarouselModule,
    SharedModule
  ],
  providers:[
    GalleryImagesService
  ]
})
export class GalleryImagesModule { }
