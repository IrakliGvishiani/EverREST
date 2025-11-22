import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserInfo } from '../models/userInfo';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  imports: [FormsModule,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

constructor(private api : ApiService,private route : Router){}


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
          // console.log(err);
          // Swal.fire({
          //   title: "error!",
          //   text: "Incorrect Password!",
          //   icon: "error"
          //   });
          
        }
      })
    }

    // firstName! : string
    // lastName! : string
    // age! : number
    // address! : string
    // phone! : string
    // zipcode! : string
    // avatar! : string
    // gender! : string

        notShow = false

    show(){
      this.notShow = !this.notShow

    }

    updateAcc(info : any){
      this.api.patch('https://api.everrest.educata.dev/auth/update', {
          firstName: info.value.firstName,
     lastName: info.value.lastName,
     age: info.value.age,
     address: info.value.address,
     phone: info.value.phone,
     zipcode: info.value.zipcode,
     avatar: info.value.avatar,
     gender: info.value.gender

      }).subscribe({
        next: s => {
          alert(`account updated! ${s}`)
        },
        error: err => {
          // alert(`error: ${err}`)
          console.log(err);
          
        }
      })
    }

    Delete(){

                let con = confirm(`Are You Sure You Want to Delete Account?`)
          if(con == true){

                  this.api.delete('https://api.everrest.educata.dev/auth/delete')
      .subscribe({
        next: s => {
             alert(`account deleted ${s}`)
           localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')

          window.location.reload()
        }
      })
                   

          }

    }



    data! : UserInfo


    oldPass! : string
  
    newPass! : string


}



//