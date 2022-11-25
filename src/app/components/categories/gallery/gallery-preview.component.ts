import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Gallery } from 'src/app/shared/models/gallery';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss'],
  providers: [ConfirmationService]
})
export class GalleryPreviewComponent implements OnInit {
  @Input() gallery!: Gallery;

  constructor( private apiService: ApiService,
               private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {
  }

  deleteGallery(){
    this.confirmationService.confirm({
      message: 'Určite chceš vymazať túto galériu?',
      accept: () => {
        this.apiService.deleteGallery(this.gallery.path);
      }
    })
    
  }
}
