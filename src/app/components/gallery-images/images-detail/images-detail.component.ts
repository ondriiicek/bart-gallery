import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Image } from 'src/app/shared/models/image';
import { GalleryImagesService } from '../_services/gallery-images.service';

@Component({
  selector: 'app-images-detail',
  templateUrl: './images-detail.component.html',
  styleUrls: ['./images-detail.component.scss']
})
export class ImagesDetailComponent implements OnInit {
  @Input() images!: Image[];
  @Input() clickedImageIndex!: number;
  @Output() closeCarousel: EventEmitter<void> = new EventEmitter<void>();
  reorderedImages: Image[] = [];

  constructor( private galleryImagesService: GalleryImagesService ) { }

  ngOnInit(): void {
    this.reorderedImages = this.galleryImagesService.reorderImages(this.images, this.clickedImageIndex);
  }

  onCloseCarousel(){
    this.closeCarousel.emit();
  }
}
