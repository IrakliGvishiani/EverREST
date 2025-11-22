import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { ErrorDialogService } from '../services/error-dialog.service';

@Component({
  selector: 'app-error-dialog',
  imports: [CommonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {


  constructor(private errServ : ErrorDialogService) {

    effect(() => {
        this.errMessage.set(this.errServ.errMessage())
        this.showDialog.set(this.errServ.errShow())
        if( this.showDialog()){
          document.body.classList.add("noScroll")
        }
    })
  }


  errMessage = signal("")

  showDialog = signal(false)

  closeDilsog(){
      this.errServ.hideDialog()
      document.body.classList.remove("noScroll")
  }

}
