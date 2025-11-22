
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product, ProductResp } from '../models/products';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private route : Router,private api : ApiService){

  }


 


// id  = ''

// keyword! : string 

// category! : string

// brand! : string

// ratee! : number

// minPrice! : number
// maxPrice! : number

// sort! : string
// sortDir! : string

  access  =  localStorage.getItem('access_token');
refresh = localStorage.getItem('refresh_token');

  ngOnInit(){

     
    
    
    if(this.refresh === null || this.access === null){
      this.route.navigateByUrl('/sign-up')
    }

    this.refreshToken()




    this.getBrands()

  this.loadProducts()



  console.log(this.access);
  

  }




refreshToken() {
  this.api.postO(
    'https://api.everrest.educata.dev/auth/refresh',
    {
      access_token: this.access,
      refresh_token: this.refresh
    }
  ).subscribe({
    next: (res: any) => {
      localStorage.setItem('access_token', res.access_token);
      this.access = res.access_token;
      console.log("Token refreshed");

    },
    error: err => {
      console.log("Refresh failed", err);
      this.route.navigateByUrl('/sign-up');
    }
  });
}


// getTokenExpiration(token: string): number | null {
//   if (!token || !token.includes('.')) return null;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.exp ? payload.exp * 1000 : null;
//   } catch {
//     return null;
//   }
// }
// isTokenExpired(token: string): boolean {
//   const exp = this.getTokenExpiration(token);
//   if (!exp) return true;
//   return Date.now() > exp;
// }
    plus(){
      this.pageIndex+=1
        
  }
  pageIndex = 1
  
  page = 0

  loadProducts(){

        this.api.gett(`https://api.everrest.educata.dev/shop/products/all?page_index=${this.pageIndex}&page_size=6`)
    .subscribe({
      next : (resp : ProductResp) => {
      console.log(resp);
      this.data = resp
      console.log(this.data);
      
      this.products = this.data.products
      // console.log(this.data.products);
      console.log(this.page);
      
    },
    error : (err) => {
      console.log(err);
      
    }
    
    }) 

    
  }

  brandArr = []


  getBrands(){
    this.api.gett('https://api.everrest.educata.dev/shop/products/brands')
    .subscribe({
      next: suc => {
        this.brandArr = suc
        
       
        
        
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  // Search(i : NgForm){
  //   this.api.gett(`https://api.everrest.educata.dev/shop/products/search?keywords=${i.value.keywords}&category_id=${i.value.category_id}&brand=${i.value.brand}&rating=${i.value.rating}&price_min=${i.value.price_min}&price_max=${i.value.price_max}&sort_by=${i.value.sort_by}&sort_direction=${i.value.sort_direction}`)
  //   .subscribe({
  //     next: (s : ProductResp) => {
  //       this.data = s
  //       this.products = s.products
  //     },
  //     error : err => {
  //       console.log(err);
        
  //     }
  //   })
  // }

  Search(i : NgForm){
    this.api.search({
      page_size : '40',
      keywords : i.value.keywords,
      category_id : i.value.category_id,
      brand : i.value.brand,
      rating : i.value.rating,
      price_min :  i.value.price_min,
      price_max :  i.value.price_max,
      sort_by : i.value.sort_by,
      sort_direction : i.value.sort_direction
    }).subscribe({
      next: (resp : any) => {
        console.log(resp);

        this.data = resp
        this.products = resp.products
        
      },
      error: err => {
        console.log(err);
        
      }
    })
  }
  
  

  nextPage(){
    if(this.pageIndex < 7){
    this.pageIndex++
    this.loadProducts()
    }
  }

  prevPage(){
    if(this.pageIndex > 1){
      this.pageIndex--
    this.loadProducts()
    }

  }

  goToPage(ind : number){
    this.pageIndex = ind
    this.loadProducts()
  }

  data! : ProductResp
  products : Product[] = []

  goWId(prodId : string){
    this.route.navigate(['/details', {
      id: prodId
    }])
  }





  

}




//https://api.everrest.educata.dev/shop/products/search?keywords=asus&category_id=1&brand=asus&rating=4&price_min=100&price_max=5000&sort_by=price&sort_direction=desc