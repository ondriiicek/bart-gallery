import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Output() fileDropped: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) 
    onDragOver(event: any){
      this.handleEventBehavior(event);
  }

  @HostListener('dragleave', ['$event'])
    onDragLeave(event: any){
      this.handleEventBehavior(event);
    }
  
  @HostListener('drop', ['$event'])
    onDrop(event: any){
      this.handleEventBehavior(event);
      const files = event.dataTransfer;
      console.log(files.files[0])

      if(files){
        this.fileDropped.emit(files);
      }
    }

  private handleEventBehavior(event: Event){
    event.preventDefault();
    event.stopPropagation();
  }
}
