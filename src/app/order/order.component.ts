import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncDecString } from '../models/EncDecString';
import { ListOrder } from '../models/ListOrder';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private titleService: Title,private cookieService: CookieService,
    private router: Router,
    private meta: Meta,
  ) { }

  orders:ListOrder[]=[]

  public totalLength: any;
  public page: number = 1;

  client:any;

  maHoa = new EncDecString;

  ngOnInit(): void {
    this.setTitle("Đơn đặt hàng của bạn");

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      this.getOrder();
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  getOrder()
  {
    this.serverHttp.getOrder(this.client.facebook_id).subscribe((data) => {
      if(data)
      {
        this.orders = data;
        this.orders.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
          element.client_phone = this.maHoa.Decrypt(element.client_phone);
          element.client_address = this.maHoa.Decrypt(element.client_address);
          element.bonus_code = this.maHoa.Decrypt(element.bonus_code);
        });
      }
    })
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
  
}
