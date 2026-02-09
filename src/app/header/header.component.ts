import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../models/userInfo';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(private route : Router,private api : ApiService,private authServ : AuthService){

    effect(() => {
      if(this.authServ.isAuthorised()){
        this.getUser()
      }
    })
  }

  show = false

  showAcc(){
    this.show = !this.show
  }

  ngOnInit(){

    if(this.data.verified == false){
      this.route.navigateByUrl('/sign-up')
    }

  }
  

  



  access  =  localStorage.getItem('access_token');
  refresh = localStorage.getItem('refresh_token');


    isAuth = () => this.authServ.isAuthorised();

  SignOut(){

    let con = confirm('Are You Sure You Want to log out?')

    if(con == true){
         localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        this.authServ.logout()
        // window.location.reload()
        this.show = false
        this.route.navigateByUrl('/sign-up')
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

  active = 'activ'

}
