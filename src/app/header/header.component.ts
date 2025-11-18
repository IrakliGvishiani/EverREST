import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../models/userInfo';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(private route : Router,private api : ApiService){

  }
  hasToken = false

  ngOnInit(){
    this.getUser()
      this.access  =  localStorage.getItem('access_token');
      this.hasToken = !!this.access
      if (!this.hasToken) {
    this.route.navigateByUrl('/sign-up');
  }

  }

  access  =  localStorage.getItem('access_token');
  refresh = localStorage.getItem('refresh_token');

  SignOut(){

    let con = confirm('Are You Sure You Want to log out?')

    if(con == true){
         localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.reload()
    }
  }

  getUser(){
    this.api.getAuth()
    .subscribe({
      next: (resp : UserInfo)  => {
        // console.log(resp);
          this.data = resp
          console.log(this.data);
          
      },
      error: err => {
        console.log(err);
        
      }
    })
  }



  data! : UserInfo

}
