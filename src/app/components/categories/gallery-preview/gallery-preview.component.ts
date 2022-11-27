import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Gallery } from 'src/app/shared/models/gallery';
import { ApiService } from 'src/app/shared/services/api.service';
import { GalleryService } from '../_services/gallery.service';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss'],
  providers: [ConfirmationService]
})
export class GalleryPreviewComponent implements OnInit {
  @Input() gallery!: Gallery;
  numOfImages!: string;

  constructor( private apiService: ApiService,
               private confirmationService: ConfirmationService,
               private router: Router,
               private galleryService: GalleryService ) { }

  ngOnInit(): void {
    this.apiService.getGalleryImages(this.gallery.path)
      .subscribe( data => {
        this.numOfImages = this.galleryService.handleNumOfImages(data.length);
      })
  }

  deleteGallery(){
    this.confirmationService.confirm({
      message: 'Určite chceš vymazať túto galériu?',
      accept: () => {
        this.apiService.deleteGallery(this.gallery.path);
      }
    })
  }

  navigateInsideGallery(){
    this.router.navigate([`photos/${this.gallery.path}`]).then();
  }
}
