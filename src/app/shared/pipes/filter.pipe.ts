import { Pipe, PipeTransform } from '@angular/core';
import { Gallery } from '../models/gallery';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(galleries: Gallery[], inputText: string): Gallery[] {
    const newArr: Gallery[] = [];

    if( galleries ){
      galleries.forEach( gallerie => {
        if(gallerie.name.toLocaleLowerCase().indexOf(inputText.toLocaleLowerCase()) > -1){
          newArr.push(gallerie);
        }
      })
    }
    
    return newArr;
  }

}
