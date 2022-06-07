import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from 'src/app/models/Admin';
import { EncDecString } from 'src/app/models/EncDecString';
import { Footer } from 'src/app/models/Footer';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
    private cookieService: CookieService,
  ){}
  
  public lengthCategory = 0;
  public lengthEvent = 0;
  public lengthProduct = 0;
  public lengthSex = 0;
  public lengthSize = 0;
  public lengthColor = 0;

  public admin = <Admin>{};

  client:any;
  ngOnInit(): void {
    this.client = JSON.parse(this.cookieService.get('client')!);

    if(this.client == null)
    {
      this.router.navigate(['/admin-login']);
    }
    else if (this.client.status == 0)
    {
      this.router.navigate(['/admin-login']);
    }
    else
    {
      this.getAdmin();
    }

  }

  maHoa = new EncDecString;
  getAdmin()
  {
    let id = this.client.id;
    this.serverHttp.getAdminIdS(Number(id)).subscribe((data) => {
      this.admin = data;
      this.admin.name = this.maHoa.Decrypt(this.admin.name);
      this.getCategory();
    })
  }

  getCategory()
  {
    this.serverHttp.getCategoryS().subscribe((data) => {
      this.getEvent();
      this.lengthCategory = data.length;
    })
  }

  getEvent()
  {
    this.serverHttp.getEventS().subscribe((data) => {
      this.lengthEvent = data.length;
      this.getProduct();
    })
  }

  getProduct()
  {
    this.serverHttp.getProductS().subscribe((data) => {
      this.lengthProduct = data.length;
      this.getSex();
    })
  }

  getSex()
  {
    this.serverHttp.getSexS().subscribe((data) => {
      this.lengthSex = data.length;
      this.getSize();
    })
  }

  getSize()
  {
    this.serverHttp.getSizeS().subscribe((data) => {
      this.lengthSize = data.length;
      this.getColor();
    })
  }

  getColor()
  {
    this.serverHttp.getColorS().subscribe((data) => {
      this.lengthColor = data.length;
    })
  }

  sweetSuccess(title:string)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  }
  
  logOut()
  {
    this.cookieService.deleteAll();
    this.router.navigate(['/admin-login']);
  }
}
