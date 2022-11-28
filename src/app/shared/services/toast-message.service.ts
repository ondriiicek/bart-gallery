import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor( private messageService: MessageService ) { }

  succesToast(message: string){
    this.messageService.add({severity: 'success', detail: message});
  }

  errorToast(message: string){
    this.messageService.add({severity: 'error', detail: message});
  }
}
