import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserInfo } from '../models/userInfo';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-account',
  imports: [FormsModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

constructor(private api : ApiService){}


  ngOnInit(){
    this.getUser()
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
    

    changePass(){
      this.api.patch(`https://api.everrest.educata.dev/auth/change_password`, {
          oldPassword: this.oldPass,
          newPassword: this.newPass
      }).subscribe({
        next: su => {
          Swal.fire({
            title: "",
             text: "Your Password Changed Successfully",
             icon: "success"
           });

           console.log(su);
           
        },
        error: err => {
          console.log(err);
          Swal.fire({
            title: "error!",
            text: "Incorrect Password!",
            icon: "error"
            });
          
        }
      })
    }

    data! : UserInfo

    oldPass! : string
  
    newPass! : string
}
