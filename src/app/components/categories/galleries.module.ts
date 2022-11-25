import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './galleries-routing.module';

import { GalleriesComponent } from './galleries.component';
import { GalleryPreviewComponent } from './gallery/gallery-preview.component';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ConfirmDialogModule
  ]
})
export class CategoriesModule { }
