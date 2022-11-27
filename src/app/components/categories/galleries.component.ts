import { Component, OnInit } from '@angular/core';
import { Gallery } from 'src/app/shared/models/gallery';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { GalleryService } from './_services/gallery.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  allGalleries!: Gallery[];
  searchInput: string = '';
  isCreationMode: boolean = false;

  constructor( private apiService: ApiService,
               private subjectService: SubjectService,
               private galleryService: GalleryService ) { }

  ngOnInit(): void {
    this.apiService.getAllGalleries()
      .subscribe( res => this.allGalleries = res); 
      
    this.subjectService.newGallerySub$
      .subscribe( newGallery =>{ this.allGalleries.push(newGallery); console.log(newGallery)})

    this.subjectService.removeGallerySub$
      .subscribe( path => this.allGalleries = this.galleryService.removeGallery(path, this.allGalleries))    
    
      this.subjectService.openModalSub$
      .subscribe( data => this.isCreationMode = data)
  }

  onCloseModal(){
    this.isCreationMode = false;
  }

}
