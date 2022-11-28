import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  newGallery: string = '';

  constructor(private apiService: ApiService,
              private subjectService: SubjectService,
              private toastMessageService: ToastMessageService) { }

  ngOnInit(): void {}

  onCloseModal(){
    this.closeModal.emit();
    this.newGallery = '';
  }

  onAddGallery(){
    if(this.newGallery.includes('/')){
      this.toastMessageService.errorToast(`Názov galérie nesmie obsahovať ' / '`);
    }else{
      this.apiService.createGallery(this.newGallery);
      this.onCloseModal();
    }
  }

}
