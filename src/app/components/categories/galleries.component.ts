import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from 'src/app/shared/models/gallery';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  allGalleries$: Observable<Gallery[]> = new Observable<Gallery[]>();

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.allGalleries$ = this.apiService.getAllGalleries();
  }

}
