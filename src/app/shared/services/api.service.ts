import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from '../models/gallery';
import { map, tap } from 'rxjs/operators';
import { Galleries } from '../models/galleries';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) {}

  getAllGalleries(): Observable<Gallery[]>{
    return this.http.get<Galleries>('http://api.programator.sk/gallery')
      .pipe( map( data => data.galleries),
        tap(data => console.log(data)))
  }

  createGallery(newGallery: string){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');

    this.http.post('http://api.programator.sk/gallery', {name: newGallery}, {headers: headers})
      .subscribe( res => console.log(res))
  }

  deleteGallery(path: string){
    this.http.delete(`http://api.programator.sk/gallery/${path}`)
      .subscribe(res => console.log(res))
  }
}
