import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryImagesComponent } from './gallery-images.component';

const routes: Routes = [
  {path: '', component: GalleryImagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryImagesRoutingModule { }
