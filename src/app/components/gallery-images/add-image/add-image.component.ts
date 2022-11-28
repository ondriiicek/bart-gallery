import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { GalleryImagesService } from '../_services/gallery-images.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  @Input() galleryPath!: string;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>()
  isModalOpen: boolean = false;
  chosenImages: File[] | null = null;
  fileNames: string[] = [];

  constructor( private apiService: ApiService,
               private galleryImagesService: GalleryImagesService,
               private subjectService: SubjectService ) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.closeModal.emit();
    this.clearModal();
  }

  onUploadImage(){
    if(this.chosenImages){
      this.apiService.uploadImage(this.chosenImages, this.galleryPath);
      this.onCloseModal();
    }
  }

  handleFileInput(event : any){
    this.chosenImages = event.files;
  }

  //user can remove chosen image before uploading
  onRemoveFromInput(image: File){
    this.chosenImages = this.galleryImagesService.removeFromInput(this.chosenImages, image);
  }

  private clearModal(){
    this.chosenImages = null;
    this.fileNames = [];
  }
}
