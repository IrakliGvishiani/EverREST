import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    firstName =""
  lastName = ""
  age = 0
  email = ''
  password = ""
  address = ""
  phone = "+995"
  zipcode = ""
  avatar = ""
  gender = ""

  zip = ''
   


  Submit(){


    let trimmedzip = this.zipcode?.toString()
    
     
    let trimmedPass = this.password?.trim() || ''
    this.zip = trimmedzip
    

  if(!this.firstName || !this.lastName || this.age == 0 || this.age > 120 || !this.email.includes('@') || !trimmedPass || !this.address || !trimmedzip || !this.avatar || !this.gender || this.phone == '+995'){
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
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        email: this.email,
        password: trimmedPass,
        address: this.address,
        phone: this.phone,
        zipcode: trimmedzip,
        avatar: this.avatar,
        gender: this.gender
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
    email : this.email
  }).subscribe(
    {
      next: (success) => {
                Swal.fire({
          title: "Success!",
          text: `Verify email sent to ${this.email}!`,
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










