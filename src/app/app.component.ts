import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ErrorDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Everrest';

  constructor(private api : ApiService,private route: Router){

  }


    access  =  localStorage.getItem('access_token');
refresh = localStorage.getItem('refresh_token');


  ngOnInit(){

  }
}
