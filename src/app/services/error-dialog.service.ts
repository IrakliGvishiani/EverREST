import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor() { }


  
  errShow = signal(false)
  errMessage =  signal("")


  showDialog(){
   this.errShow.set(true)
  }
  hideDialog(){
    this.errShow.set(false)
  }

  setErrMessage(message : string){
    this.errMessage.set(message)
  }

}
