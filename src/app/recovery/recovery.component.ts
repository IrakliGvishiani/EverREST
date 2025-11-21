import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recovery',
  imports: [FormsModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent {

  constructor(private api : ApiService,private route : Router){

  }

  SendRecover(mail : any){

    console.log(mail.value);
    
    if(!mail.valid){
               Swal.fire({
              icon: 'warning',
              title: '',
              text: 'Please fill field!',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#667eea'
            });
    }
    else{
      this.api.postO(`https://api.everrest.educata.dev/auth/recovery`, {
        email: mail.value.email
      }).subscribe({
        next: su => {
          console.log(su);
          
                       Swal.fire({
              icon: 'success',
              title: '',
              text: `Recovery Email Sent to ${mail.value.email}`,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#667eea'
            });

            this.route.navigateByUrl('/sign-in')

        },
        error: err => {
                       Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: "Something's Wrong!",
              confirmButtonText: 'Ok',
              confirmButtonColor: '#667eea'
            });

            console.log(err);
            
        }
      })
    }
  }
  
}
