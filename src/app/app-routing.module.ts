import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'galleries', pathMatch: 'full' },
  { 
    path: 'galleries', 
    loadChildren: () => import('./components/categories/galleries.module').then(m => m.GalleriesModule) 
  },
  {
    path: 'photos/:id',
    loadChildren: () => import('./components/gallery-images/gallery-images.module').then(m => m.GalleryImagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
