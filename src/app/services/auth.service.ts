import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    this.checkStatus()
  }

  isAuthorised = signal(false)


  checkStatus(){
    let token = localStorage.getItem('access_token')
    if(token){
      this.isAuthorised.set(true)
    } 
  }
  login(){
    this.isAuthorised.set(true)
  }
  logout(){
    this.isAuthorised.set(false)
  }
}
