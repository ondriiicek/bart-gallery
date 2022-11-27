import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  newGallery: string = '';

  constructor(private apiService: ApiService,
              private subjectService: SubjectService) { }

  ngOnInit(): void {}

  onCloseModal(){
    this.closeModal.emit();
    this.newGallery = '';
  }

  onAddGallery(){
    this.apiService.createGallery(this.newGallery);
    this.onCloseModal();
  }

}
