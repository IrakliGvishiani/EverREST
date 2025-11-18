import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-in',
  imports: [RouterLink,FormsModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor(private api : ApiService,private route : Router){

  }


  email = ''
  password = ''



  Sign(){
    if(!this.email || !this.password){
            Swal.fire({
                title: "error!",
                text: "Fill Fields",
                icon: "error"
              });
    }
    else{
      
      this.api.postO('https://api.everrest.educata.dev/auth/sign_in', {
        
     email : this.email,
     password : this.password

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

              console.log((succ as any).access_token);
              
              setTimeout(() => {
                this.route.navigateByUrl('/home')
              }, 1400);
            
          },
          error: (err) => {
            
                Swal.fire({
                title: "error!",
                text: "Invalid Email or Passwordd",
                icon: "error"
              });
              console.log(err);
              
            
          }
        }
        
      )
      
      
    }
  }

}
