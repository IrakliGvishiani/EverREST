import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


  ///GETT

  gett<T = any>(url: string): Observable<T>{
    return this.http.get<T>(url)
  }

  getAuth<T = any>(): Observable<T> {
  const token = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<T>('https://api.everrest.educata.dev/auth', { headers });
}



///POSTT

postO(url: string, obj: any) {
  const token = localStorage.getItem('access_token');

  return this.http.post(url, obj, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  });
}








///SEARCH
search<T = any>(filters : any): Observable<T>{
  let params = new HttpParams

  Object.keys(filters).forEach(key => {
    if(
      filters[key] !== null && 
      filters[key] !== undefined && 
      filters[key] !== ''
    ){
      params = params.set(key,filters[key])
    }
  })

  return this.http.get<T>('https://api.everrest.educata.dev/shop/products/search', {params})
}
}
