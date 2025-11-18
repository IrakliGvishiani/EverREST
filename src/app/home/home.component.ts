
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product, ProductResp } from '../models/products';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private route : Router,private api : ApiService){

  }


 
access  =  localStorage.getItem('access_token');
refresh = localStorage.getItem('refresh_token');

id  = ''

keyword! : string 

category! : string

brand! : string

ratee! : number

minPrice! : number
maxPrice! : number

sort! : string
sortDir! : string

  ngOnInit(){
     console.log(this.ratee);
     
    
    if(this.refresh === null || this.access === null){
      this.route.navigateByUrl('/sign-up')
    }

    this.getBrands()

  this.loadProducts()

this.api.postO('https://api.everrest.educata.dev/auth/refresh', {
  access_token: this.access,
  refresh_token: this.refresh
})
.subscribe({
  next: s => console.log(s),
  error: e => console.log(e)
});

  console.log(this.access);
  

  }
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

  Search(){
    this.api.search({
      page_size : '40',
      keywords : this.keyword,
      category_id : this.category,
      brand : this.brand,
      rating : this.ratee,
      price_min : this.minPrice,
      price_max :  this.maxPrice,
      sort_by : this.sort,
      sort_direction : this.sortDir
    }).subscribe({
      next: (resp : ProductResp) => {
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
