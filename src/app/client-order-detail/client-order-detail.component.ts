import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cart } from '../models/Cart';
import { ServiceService } from '../services/service.service';
import { ListOrder } from '../models/ListOrder';
import { Location } from '@angular/common';
import { EncDecString } from '../models/EncDecString';
import { Meta, Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.css']
})

export class ClientOrderDetailComponent implements OnInit {

  constructor(
    private router: ActivatedRoute, 
    public serverHttp: ServiceService,
    private cookieService: CookieService,
    private routerL: Router,
    private location: Location,
    private titleService: Title,
    private meta: Meta,
  ) { }

  order_id = 0;

  order = <ListOrder>{}
  carts: Cart[]=[];

  orderTotalPrice = 0;

  client:any;
  maHoa = new EncDecString;

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    this.setTitle("Chi tiết đơn hàng - ...");

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      this.order_id = this.router.snapshot.params['id'];
      this.getOrderCart();
    }
    else
    {
      this.routerL.navigate(['/login']);
    }
  }

  changeNameProduct(item:Cart)
  {
    item.product_name = this.removeAccents(item.product_name);
    this.routerL.navigate(['/product-detail', item.product_name, item.product_id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  getOrderCart()
  {
    this.serverHttp.getOrderDetail(this.order_id).subscribe((data) => {
      if(data.client_id == this.client.facebook_id)
      {
        this.order = data;
        this.order.client_name = this.maHoa.Decrypt(this.order.client_name);
        this.order.client_phone = this.maHoa.Decrypt(this.order.client_phone);
        this.order.client_address = this.maHoa.Decrypt(this.order.client_address);
        this.order.bonus_code = this.maHoa.Decrypt(this.order.bonus_code);
        this.getCartItem(data.id);
        this.setTitle("Chi tiết đơn hàng - " + this.order.order_name);
      }
    })
  }

  getCartItem(id:number)
  {
    this.serverHttp.getCartItem(id).subscribe((data) => {
      if(data)
      {
        this.carts = data;
        this.carts.forEach(element => {
          element.product_total_price = (Number(element.product_new_price) * element.product_number).toString();
          this.orderTotalPrice +=  Number(element.product_total_price);
        });
      }
    })
  }

  confirmCancelOrder(item:ListOrder)
  {
    Swal.fire({
      title: 'Tại sao bạn muốn hủy',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận hủy',
      cancelButtonText: 'Quay lại',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if(login)
        {
          this.cancelOrder(item, login);
        }
        else
        {
          this.sweetWarning("Hãy nhập lý do bạn muốn hủy");
        }
      }
    })
  }

  cancelOrder(item:ListOrder, str:string)
  {
    item.client_note = "Lý do bạn hủy đơn hàng: " + str;
    this.serverHttp.putCancelOrder(item).subscribe((data) => {
      if(data)
      {
        this.sweetSuccess("Hủy thành công");
        this.order.status="Đã hủy";
      }
    })
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
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

  public goBack()
  {
    this.location.back();
  }

  sweetWarning(title:string)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  }

  sweetError(title:string)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  }

}
