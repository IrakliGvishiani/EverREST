import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserInfo } from '../models/userInfo';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

constructor(private api : ApiService,private route : Router,private fb : FormBuilder){}



  ngOnInit(){


    this.updateForm = this.fb.group({
         firstName: [``],
      lastName: [''],
      age: [''],
      address: [''],
      phone: [''],
      zipcode: [''],
      avatar: [''],
      gender: ['']
    })

        this.getUser()

  }


  updateForm! : FormGroup

    getUser(){
      this.api.getAuth()
      .subscribe({
        next: (resp : UserInfo)  => {
          // console.log(resp);
            this.data = resp
            console.log(this.data);


                    this.updateForm.patchValue({
          firstName: resp.firstName,
          lastName: resp.lastName,
          age: resp.age,
          address: resp.address,
          phone: resp.phone,
          zipcode: resp.zipcode,
          avatar: resp.avatar,
          gender: resp.gender
        });
            
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

    updateAcc(){
      let body = this.updateForm.value
      
      this.api.patch('https://api.everrest.educata.dev/auth/update', body  )
      .subscribe({
        next: s => {
          alert(`account updated!`)
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