import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Gallery } from '../models/gallery';
import { map, tap } from 'rxjs/operators';
import { Galleries } from '../models/galleries';
import { ApiURL } from '../enums/api-url.enum';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  successSub$: Subject<string> = new Subject<string>();

  constructor( private http: HttpClient,
               private toastMessageService: ToastMessageService ) {}

  getAllGalleries(): Observable<Gallery[]>{
    return this.http.get<Galleries>(ApiURL.GALLERIES_URL)
      .pipe( map( data => data.galleries),
        tap(data => console.log(data)))
  }

  createGallery(newGallery: string){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');

    this.http.post(ApiURL.GALLERIES_URL, {name: newGallery}, {headers: headers})
      .subscribe( () => this.toastMessageService.succesToast(`Galéria ${newGallery} bola úspešne vytvorená.`))
  }

  deleteGallery(path: string){
    this.http.delete(`${ApiURL.GALLERIES_URL}/${path}`)
      .subscribe(res => this.toastMessageService.succesToast(`Galéria bola úspešne odstranená.`))
  }
}
