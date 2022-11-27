import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Gallery } from '../models/gallery';
import { map, tap } from 'rxjs/operators';
import { Galleries } from '../models/galleries';
import { ToastMessageService } from './toast-message.service';
import { Image } from '../models/image';
import { Images } from '../models/images';
import { SubjectService } from './subject.service';
import { UploadedRes } from '../models/uploaded-res';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  successSub$: Subject<string> = new Subject<string>();
  static readonly GALLERIES_URL = 'gallery';

  constructor( private http: HttpClient,
               private toastMessageService: ToastMessageService,
               private subjectService: SubjectService ) {}

  //RETURN ALL GALLERIES IN DATABASE
  getAllGalleries(): Observable<Gallery[]>{
    return this.http.get<Galleries>(ApiService.GALLERIES_URL)
      .pipe( map( data => data.galleries),
        tap(data => console.log(data)))
  }

  //CREATE GALLERY
  createGallery(newGallery: string){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');

    this.http.post<Gallery>(ApiService.GALLERIES_URL, {name: newGallery}, {headers: headers})
      .subscribe(res => {
        this.subjectService.pushNewGallery(res);
        this.toastMessageService.succesToast(`Galéria ${newGallery} bola úspešne vytvorená.`)
      });
  }

  //DELETE GALLERY
  deleteGallery(path: string){
    this.http.delete(`${ApiService.GALLERIES_URL}/${path}`)
      .subscribe(() =>{
        this.subjectService.removeGallery(path);
        this.toastMessageService.succesToast(`Galéria bola úspešne odstranená.`);
      });
        
  }

  //RETURN ALL IMAGES FROM CHOSEN GALLERY
  getGalleryImages(path: string): Observable<Image[]>{
    return this.http.get<Images>(`${ApiService.GALLERIES_URL}/${path}`)
      .pipe( map(data => data.images));
  }

  //UPLOAD IMAGE/IMAGES
  uploadImage(images: File[], galleryPath: string){
    for(const image of images) {
      const formData : FormData = new FormData();
      formData.append('image', image, image.name);

      this.http.post<UploadedRes>(`${ApiService.GALLERIES_URL}/${galleryPath}`, formData)
        .subscribe((res: UploadedRes) => {
          this.subjectService.pushNewImage(res.uploaded);
          this.toastMessageService.succesToast('Obrázok bol úspešne uploadnutý.')
        });
    }
  }

  //DELETE IMAGE
  deleteImage(image: Image){
    this.http.delete(`${ApiService.GALLERIES_URL}/${image.fullpath}`)
    .subscribe(() => this.toastMessageService.succesToast('Obrázok bol úspešne vymazaný.'));
  }
}
