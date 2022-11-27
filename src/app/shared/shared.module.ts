import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddNewComponent } from './components/add-new/add-new.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AddNewComponent,
    FilterPipe
  ],
  imports: [
    ConfirmDialogModule
  ],
  exports: [
    ConfirmDialogModule,
    AddNewComponent,
    FilterPipe
  ]
})
export class SharedModule { }