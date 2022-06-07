import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  client:any;
  ngOnInit(): void {
    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      if (this.client.status == 0)
      {
        this.router.navigate(['/admin-login']);
      }
    }
    else
    {
      this.router.navigate(['/admin-login']);
    }
  }
  
  onActivate() {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
 
}
