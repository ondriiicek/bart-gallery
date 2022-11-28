import { Injectable } from '@angular/core';
import { Image } from 'src/app/shared/models/image';

@Injectable()
export class GalleryImagesService {

  constructor() { }

  //removing unwanted characters from gallery name
  handleGalleryName(value: string): string{
    if( !value.includes('%20') ){
      return value;
    } 

    const galleryName = value.split('%20').join(' ')
    return galleryName;
  }

  //returning array without image that user want to remove from image file list
  removeFromInput(images: File[] | null, unwantedIm: File): File[]{
    let newArr = [];
    if(images){
      for(const image of images){
        if(image !== unwantedIm){
          newArr.push(image)
        }
      }
    }
    return newArr;
  }

  //reordering array of images, so that the first image in the carousel is the image the user clicked on
  reorderImages(images: Image[], index: number): Image[]{
    const clickedImage = images[index];

    let restOfImages = images.slice();
    restOfImages.splice(index, 1);

    const finalImagesArr = [clickedImage, ...restOfImages];

    return finalImagesArr;
  }
}
