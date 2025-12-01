import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(private route : Router){

  }
 access  =  localStorage.getItem('access_token');
refresh = localStorage.getItem('refresh_token');


  goHome(){
    if(this.access === null || this.refresh === null){
      this.route.navigateByUrl('/sign-up')
    }
    else{
      this.route.navigateByUrl('/home')
    }
  }



}
