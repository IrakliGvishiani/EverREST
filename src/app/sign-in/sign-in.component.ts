import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-sign-in',
  imports: [RouterLink,FormsModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor(private api : ApiService,private route : Router,private auth : AuthService){

  }


  // email = ''
  // password = ''



  Sign(inf : NgForm){
      this.api.postO('https://api.everrest.educata.dev/auth/sign_in', {
        
     email : inf.value.email,
     password : inf.value.password

      }).subscribe(
        {
          next: (succ) => {
                Swal.fire({
                title: "success",
                text: "Sign In was Successful",
                icon: "success"
              });

              localStorage.setItem('access_token', (succ as any).access_token);
              localStorage.setItem('refresh_token',(succ as any).refresh_token);
               this.auth.login()

              console.log((succ as any).access_token);

  
              
              setTimeout(() => {
                this.route.navigateByUrl('/home')
              }, 1400);
            
          },
          error: (err) => {
            
              //   Swal.fire({
              //   title: "error!",
              //   text: "Invalid Email or Passwordd",
              //   icon: "error"
              // });
              console.log(err);
              
            
          }
        }
        
      )
      
      
    
  }

}
