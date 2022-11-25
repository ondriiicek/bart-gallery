import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
  isCreationMode: boolean = false;
  newGallery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  toggleModal(){
    this.isCreationMode = !this.isCreationMode;
    this.newGallery = '';
  }

  onAddGallery(){
    this.apiService.createGallery(this.newGallery);
  }

}
