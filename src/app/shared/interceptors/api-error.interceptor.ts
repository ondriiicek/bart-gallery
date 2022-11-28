import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ToastMessageService } from '../services/toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private toastMessageService: ToastMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((httpError: HttpErrorResponse) => {
          console.log(httpError.error)
          switch(httpError.status){
            case 400: this.toastMessageService.errorToast('Pislušný súbor neexistuje.');
              break;
            case 404: this.toastMessageService.errorToast('Pislušný súbor neexistuje.');
              break;
            case 409: this.toastMessageService.errorToast('Galéria s týmto názvom už existuje.');
              break;
            case 500: this.toastMessageService.errorToast('Nastala neznáma chyba.');
              break;
            default: this.toastMessageService.errorToast('Niekde nastala chyba');
              break;
          }
          return throwError(httpError);
        })
      );
  }
}
