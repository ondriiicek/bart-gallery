import { Injectable } from '@angular/core';
import { Gallery } from 'src/app/shared/models/gallery';

@Injectable()
export class GalleryService {

  constructor() { }

  handleNumOfImages(length: number): string{
    let finalString;
    
    if(length == 1){
      finalString = `${length} fotka`;
    }
    else if (length > 1 && length < 5){
      finalString = `${length} fotky`;
    }
    else{
      finalString = `${length} fotiek`;
    }

    return finalString;
  }

  removeGallery(path: string, allGalleries: Gallery[]): Gallery[]{
    let newArrOfGalleries : Gallery[] = [];
    allGalleries.forEach(item => {
      if(item.path != path){
        newArrOfGalleries.push(item);
      }
    })

    return newArrOfGalleries;
  }
}
