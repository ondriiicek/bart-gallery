import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @Input() title!: string;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  onOpenModal(){
    this.subjectService.openModal();
  }
}
