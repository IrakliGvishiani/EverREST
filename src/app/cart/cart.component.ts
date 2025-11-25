import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';


import { SingleProduct } from '../models/productsById';
import { Cart, CartProduct } from '../models/cart';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  constructor(private api : ApiService){}

  cart! : Cart
  prodArray : CartProduct[] = []
  single : SingleProduct[] = []
  cartView: { product: SingleProduct, quantity: number }[] = [];

      access  =  localStorage.getItem('access_token');
refresh = localStorage.getItem('refresh_token');

qrImage! : string

  ngOnInit(){
   this.api.getCart('https://api.everrest.educata.dev/shop/cart')
   .subscribe({
    next: (resp: Cart) => {
      this.cart = resp
      this.prodArray = resp.products
      // console.log(this.prodArray);
      this.prodArray.forEach(item => {
        this.api.gett(`https://api.everrest.educata.dev/shop/products/id/${item.productId}`)
        .subscribe({
          next: (data : SingleProduct) => {
            this.cartView.push({
                    product: data,
                    quantity: item.quantity
                  })
          },
          error: err => console.log(err)
          
        })
      })
      
      
    },
    error: err => {
      console.log(err);
      
    }
   })
  }


  RemoveProd(pid : string){
    this.api.deleteProd('https://api.everrest.educata.dev/shop/cart/product', {
      id: pid
    }).subscribe({
      next: res => {
        console.log(res)
        window.location.reload()
      }
      
      ,
      error: err => console.log(err)
      
    })
    
  }


  deleteCart(){

    let conf = confirm('Are You Sure You Want To Delete Cart?')

    if(conf == true){
          this.api.delete('https://api.everrest.educata.dev/shop/cart')
    .subscribe({
      next: res => {
        //    Swal.fire({
        //    title: "",
        //   text: "Cart Deleted!",
        //   icon: "success"
        // });
        window.location.reload()
        console.log(res);
        
      },
      error: err => {
                Swal.fire({
           title: "",
          text: "You Dont Have Cart!",
          icon: "info"
        });
      }
      
    })
    }


  }

  Buy(){
    let con = confirm('Agree Payment?')

    if(con == true){
      this.api.postO('https://api.everrest.educata.dev/shop/cart/checkout',{
           access_token: this.access,
      refresh_token: this.refresh
      }).subscribe({
        next: res => {
               Swal.fire({
           title: "",
          text: "Successfull Payment!",
          icon: "success"
        });

        setTimeout(() => {
            window.location.reload()
        }, 1300);
        console.log(res);
        
        },
        error: er => console.log(er)
        
      })
    }
  }

  show = false


  generate(txt : string){
    this.api.postO('https://api.everrest.educata.dev/qrcode/generate', {
      text : txt,
    }).subscribe({
      next: (res : any) => {
        // alert('success' + res)
        this.qrImage = res.result
        this.show = true
      },
      error: e => console.log(e)
      
    })
  }

  hide(){
    this.show = false
  }
}
