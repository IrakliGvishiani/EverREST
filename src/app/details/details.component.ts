import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SingleProduct } from '../models/productsById';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor(private routeParam : ActivatedRoute,private api : ApiService,private route : Router){
    this.routeParam.params.subscribe(data => {
      this.id = data['id']
    })
  }

  access  =  localStorage.getItem('access_token');
refresh = localStorage.getItem('refresh_token');

  ngOnInit(){
        if(this.refresh === null || this.access === null){
      this.route.navigateByUrl('/sign-up')
    }

    this.api.gett(`https://api.everrest.educata.dev/shop/products/id/${this.id}`)
    .subscribe((resp : SingleProduct) => {
      this.product = resp
      console.log(this.product);

    })
  }
  id! : string

  product : SingleProduct = new SingleProduct

  showInput = false

  toggle(){
    this.showInput = !this.showInput
  }

  rateNum! : number

  rate(prod : string){


    if(this.rateNum > 5 || this.rateNum < 1){
                            Swal.fire({
                  title: "Oops!",
                  text: "Rate Scale is Between 1 and 5!",
                  icon: "error"
                });
    }
    else{

          this.api.postO(`https://api.everrest.educata.dev/shop/products/rate`, {
      
     productId: prod,
     rate: this.rateNum

    }).subscribe({
      next: (succ) => {
                      Swal.fire({
                  title: "Product was Succesfully Rated",
                  text: "Thanks For Feedback!",
                  icon: "success"
                });
                console.log(succ);
                
      },
      error: (err) => {
                      Swal.fire({
                  title: "error!",
                  text: "Something Went Wrong!",
                  icon: "error"
                });
                console.log(err);
                
      }
    })

    }
    


    
  }


}





// 691a00d4584627bfec1a5249  id of account