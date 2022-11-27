import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './galleries-routing.module';

import { GalleriesComponent } from './galleries.component';

import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { FormsModule } from '@angular/forms';
import { GalleryPreviewComponent } from './gallery-preview/gallery-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GalleryService } from './_services/gallery.service';


@NgModule({
  declarations: [
    GalleriesComponent,
    GalleryPreviewComponent,
    AddGalleryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers:[
    GalleryService
  ]
})
export class GalleriesModule { }
