import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Image } from 'src/app/shared/models/image';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { GalleryImagesService } from './_services/gallery-images.service';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss'],
  providers: [ConfirmationService]
})
export class GalleryImagesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  images: Image[] = [];
  clickedImage!: number;
  galleryName!: string;
  isCarouselView: boolean = false;
  isModalOpen: boolean = false;

  constructor( private route: ActivatedRoute,
               private apiService: ApiService,
               private confirmationService: ConfirmationService,
               private galleryImagesService: GalleryImagesService,
               private subjectService: SubjectService ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe( params =>{
        this.galleryName = this.galleryImagesService.handleGalleryName(params['id']);
        this.handleImages();
      })

    this.handleSubjects();
  }

  openCarousel(i: number){
    this.clickedImage = i;
    this.isCarouselView = true;
  }

  closeCarousel(){
    this.isCarouselView = false;
  }

  onCloseModal(){
    this.isModalOpen = false;
  }

  onDeleteImage(image: Image){
    this.confirmationService.confirm({
      message: 'Určite chcete vymazať tento obrázok?',
      accept: () => {
        this.apiService.deleteImage(image);
        this.images.splice(this.images.indexOf(image), 1)
      }
    });
  }

  private handleImages(){
    this.apiService.getGalleryImages(this.galleryName).subscribe(
      data => this.images = data
    );
  }

  private handleSubjects(){
    //if there is successful api call, function from ApiService will send new-image
    //through subject that is provided in SubjectService 
    this.subjectService.newImageSub$
      .pipe(takeUntil(this.destroy$))
      .subscribe(image => this.images.push(image));

    //listens for subject changes so it knows whe to open modal (emit in shared/component/add-new)
    this.subjectService.openModalSub$
      .pipe(takeUntil(this.destroy$))
      .subscribe( data => this.isModalOpen = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
