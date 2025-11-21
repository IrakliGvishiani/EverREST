import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from "@angular/router";


@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  constructor(private api : ApiService,private router : Router){

  }

  // ngOnInit(){

       
                  

  // }
  //   firstName =""
  // lastName = ""
  // age = 0
  // email = ''
  // password = ""
  // address = ""
  // phone = "+995"
  // zipcode = ""
  // avatar = ""
  // gender = ""

  // zip = ''
   


  Submit(info : NgForm){


    
    console.log(info);
    

  if(!info.valid){
         Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please fill all the fields',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#667eea'
      });
    }

    else{


      
          this.api.postO('https://api.everrest.educata.dev/auth/sign_up' , 
         {
        firstName: info.value.firstName,
        lastName: info.value.lastName,
        age: info.value.age,
        email: info.value.email,
        password: info.value.password,
        address: info.value.address,
        phone: info.value.phone,
        zipcode: info.value.zipcode?.toString(),
        avatar: info.value.avatar,
        gender: info.value.gender
      }
      ).subscribe(
        
 {
          next: (succ) => {
            Swal.fire({
          title: "Success!",
          text: "Account Created Succesfully!",
          icon: "success"
        });
        console.log(succ);
                 this.api.postO('https://api.everrest.educata.dev/auth/verify_email', {
    email : info.value.email
  }).subscribe(
    {
      next: (success) => {
                Swal.fire({
          title: "Success!",
          text: `Verify email sent to ${info.value.email}!`,
          icon: "success"
        });

        console.log(success);
        
      },
      error: (err) => {
                Swal.fire({
          title: "error!",
          text: "Email Already Verified",
          icon: "error"
        });

        console.log(err);
        
      }
    }
  )

        
        

    setTimeout(() => {
      this.router.navigateByUrl('/sign-in')
    }, 1500);
    
            
          },
          error: (err) => {
            console.log('ERROR' , err);
            
            if(err.status == 400){
              
                      Swal.fire({
              title: "Incorrect Data!",
              text: "Fill Fields with Aprropriate Data!",
              icon: "error"
            });
            console.log(err.status);
            
                  console.log(err.error);         
            }

            if(err.status == 409){
              
                      Swal.fire({
              title: "Email Already Exists!",
              text: "Fill Fields with Aprropriate Data!",
              icon: "error"
            });
            console.log(err.error);
            
             console.log(err.status);
              
            }
          }
        }
      )
  

              

     

      
    }


    

  
    
    
    
  }




    




}










