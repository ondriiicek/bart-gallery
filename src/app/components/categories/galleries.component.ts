import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Gallery } from 'src/app/shared/models/gallery';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { GalleryService } from './_services/gallery.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit, OnDestroy{
  allGalleries!: Gallery[];
  searchInput: string = '';
  isCreationMode: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private apiService: ApiService,
               private subjectService: SubjectService,
               private galleryService: GalleryService ) { }

  ngOnInit(): void {
    this.apiService.getAllGalleries()
      .subscribe( res => this.allGalleries = res); 
    
    this.handleSubjects();    
  }

  onCloseModal(){
    this.isCreationMode = false;
  }

  private handleSubjects(){
    //if there is successful api call, function from ApiService will send new-gallery/removed-gallery
    //through subject that is provided in SubjectService 
    this.subjectService.newGallerySub$
      .pipe(takeUntil(this.destroy$))
      .subscribe( newGallery => this.allGalleries.push(newGallery))

    this.subjectService.removeGallerySub$
      .pipe(takeUntil(this.destroy$))
      .subscribe( path => this.allGalleries = this.galleryService.removeGallery(path, this.allGalleries))    
    
    //listens for subject changes so it knows whe to open modal (emit in shared/component/add-new)
    this.subjectService.openModalSub$
      .pipe(takeUntil(this.destroy$))
      .subscribe( data => this.isCreationMode = data)
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe;
  }

}
