import { Injectable } from '@angular/core';
import { Image } from 'src/app/shared/models/image';

@Injectable()
export class GalleryImagesService {

  constructor() { }

  handleGalleryName(value: string): string{
    if( !value.includes('%20') ){
      return value;
    } 

    const galleryName = value.split('%20').join(' ')
    return galleryName;
  }

  getFileNames(images: File[] | null): string[]{
    let fileNames = [];
    if(images){
      for(const image of images){
        fileNames.push(image.name)
      }
    }
    return fileNames;
  }

  reorderImages(images: Image[], index: number): Image[]{
    const clickedImage = images[index];

    let restOfImages = images.slice();
    restOfImages.splice(index, 1);

    const finalImagesArr = [clickedImage, ...restOfImages];

    return finalImagesArr;
  }
}
