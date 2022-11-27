import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Gallery } from '../models/gallery';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  openModalSub$: Subject<boolean> = new Subject<boolean>();
  newGallerySub$: Subject<Gallery> = new Subject<Gallery>();
  removeGallerySub$: Subject<string> = new Subject<string>();
  newImageSub$: Subject<Image> = new Subject<Image>();

  constructor() { }

  openModal(){
    this.openModalSub$.next(true);
  }

  pushNewGallery(gallery: Gallery){
    this.newGallerySub$.next(gallery);
  }

  removeGallery(path: string){
    this.removeGallerySub$.next(path);
  }

  pushNewImage(image: Image[]){
    this.newImageSub$.next(image[0]);
  }
}
