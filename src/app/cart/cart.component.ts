import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Cart } from '../models/Cart';
import { EncDecString } from '../models/EncDecString';
import { Event_ } from '../models/Event_';
import { Product } from '../models/Product';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private titleService: Title,
    private cookieService: CookieService,
    public serverHttp: ServiceService,
    private router: Router,
    private meta: Meta,
  ) {
      this.siteKey = JSON.parse(localStorage.getItem('footer')!).captchaElemKey;
    }

  siteKey: string;

  carts: Cart[]=[];
  events: Event_[]=[];
  productAmount: Product[]=[];

  nextPay = false;

  orderTotalPrice = 0;
  orderTransportFee = 0;
  orderPay = 0;

  bonus_code_id = 0;
  bonus_code_amount = 0;
  bonuses = 0;
  bonus_code = '';

  mienphivanchuyenkhi = 169000;

  addOrderForm = new FormGroup({
    id: new FormControl(''),
    order_name: new FormControl(''),
    order_payments: new FormControl(''),
    order_transport_fee: new FormControl(''),
    order_total_price: new FormControl(''),
    order_total_price_old: new FormControl(''),
    order_prepay: new FormControl(''),
    bonus_code: new FormControl(''),
    bonuses: new FormControl(''),
    client_id: new FormControl(''),
    client_name: new FormControl(''),
    client_phone: new FormControl(''),
    client_address: new FormControl(''),
    client_note: new FormControl(''),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
    received_date: new FormControl(''),
    status: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  getEventCodeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  public currentDate = new Date();
  datePipe: DatePipe = new DatePipe('en-US');

  client:any;

  maHoa = new EncDecString;

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void 
  {
    this.setTitle("Giỏ hàng của bạn");

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      this.getClient();
      this.getEvent();
    }
    else
    {
      this.router.navigate(['/login']);
    }
    
  }

  submitEventCode()
  {
    this.serverHttp.putEventCode(this.getEventCodeForm.value).subscribe((data) => {
      console.log(data);
      this.sweetSuccessOk("Mã đã gửi đến email của bạn");
      this.changeShowGetEvent(false);
      this.getEventCodeForm.reset();
    })
  }

  showGetEvent=false;
  changeShowGetEvent(sta:boolean)
  {
    this.showGetEvent=sta;
    if(sta)
    {
      this.getEventCodeForm.patchValue({
        name: this.maHoa.Decrypt(this.client.name),
        email: this.maHoa.Decrypt(this.client.email),
      });
    }
  }

  changeNameProduct(item:Cart)
  {
    item.product_name = this.removeAccents(item.product_name);
    this.router.navigate(['/product-detail', item.product_name, item.product_id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  changeNextPay(status:boolean)
  {
    this.nextPay = status;
  }

  getEvent()
  {
    this.serverHttp.getEvent().subscribe((data) => {
      if(data)
      {
        this.events=data;
        this.events.forEach(element => {
          element.bonus_code = this.maHoa.Decrypt(element.bonus_code);
        });
      }
    })
  }
  getBonuses()
  {
    let i=0;
    if(this.bonus_code)
    {
      this.events.forEach(element => {
        i++;
        if(this.bonus_code == element.bonus_code && element.amount > 0 && element.status == true)
        {
          this.bonuses = Number(element.bonuses);
          this.bonus_code_id = element.id;
          this.bonus_code_amount = element.amount;
          this.updateOrderTotalPrice();
        }
        if(i == this.events.length && this.bonuses == 0)
        {
          this.sweetWarning("Mã không có sẵn");
        }
      });
    }
    else
    {
      this.sweetWarning("Mã không có sẵn");
    }
  }

  removeBonuses()
  {
    this.bonuses = 0;
    this. bonus_code = '';
    this. bonus_code_id = 0;
    this. bonus_code_amount = 0;
    this.updateOrderTotalPrice();
  }

  updateOrderTotalPrice()
  {
    this.orderTotalPrice = 0;
    this.carts.forEach(element => {
      this.orderTotalPrice +=  Number(element.product_total_price);
    });

    if(this.orderTotalPrice > this.mienphivanchuyenkhi)
    {
      this.orderTransportFee = 0;
    }
    else
    {
      this.orderTransportFee = 30000;
    }

    this.orderPay = (this.orderTotalPrice + this.orderTransportFee) - this.bonuses
  }

  plusAmount(item:Cart)
  {
    if(item.product_number < 999)
    {
      item.product_number ++;
      let  a = item.product_number * Number(item.product_new_price);
      item.product_total_price = a.toString();
      this.putNumberCartItem(item);
    }
  }

  minusAmount(item:Cart)
  {
    if(item.product_number > 1)
    {
      item.product_number --;
      let  a = item.product_number * Number(item.product_new_price);
      item.product_total_price = a.toString();
      this.putNumberCartItem(item);
    }
  }

  putNumberCartItem(item:Cart)
  {
    this.serverHttp.putNumberCartItem(item).subscribe((data) => {
      if(data)
      {
        this.updateOrderTotalPrice();
      }
    })
  }

  async deleteCartItem(id:number)
  {
    await this.serverHttp.deleteCartItem(id).subscribe((data) => {
      if(data)
      {
        this.getCartItem(this.addOrderForm.value.id);
        this.sweetSuccess("Xóa thành công");
      }
    })
  }

  getOrderCart()
  {
    this.serverHttp.getOrderCart(this.client.facebook_id).subscribe((data) => {
      if(data)
      {
        this.getCartItem(data.id);

        this.addOrderForm.patchValue({
          id : data.id,
        });
      }
    })
  }

   clearCartItem()
  {
    this.carts.forEach(e => {
      this.deleteCartItem(e.id);
    });
  }

  getCartItem(id:number)
  {
    this.serverHttp.getCartItem(id).subscribe((data) => {
      if(data)
      {
        this.carts = data;
        this.serverHttp.cart_length = this.carts.length;
        this.carts.forEach(element => {
          element.product_total_price = (Number(element.product_new_price) * element.product_number).toString();
        });
        this.getProductAmount();
        this.updateOrderTotalPrice();
      }
    })
  }

  getClient()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.addOrderForm.patchValue({
      client_id: this.client.facebook_id,
      client_name: this.maHoa.Decrypt(this.client.name),
      client_phone: this.maHoa.Decrypt(this.client.phone),
      client_address: this.maHoa.Decrypt(this.client.address),
      created_at: transformDate,
    });

    this.getOrderCart();
  }

  getProductAmount()
  {
    this.serverHttp.getProductAmount().subscribe((data) => {
      if(data)
      {
        this.productAmount = data;
      }
    });
  }

  btnDisabled = false;
  submitOrder()
  {
    this.btnDisabled = true;
    let statusSubmitOrder=true;
    let nameOrder = this.client.facebook_id;
    this.carts.forEach(c => {
      nameOrder =  nameOrder.toString() + ", " + c.product_name.toString();
      this.productAmount.forEach(p => {
        if(c.product_id == p.id)
        {
          if(c.product_number > p.amount)
          {
            statusSubmitOrder = false;
          }
        }
      });
    });

    if(statusSubmitOrder)
    {
      this.addOrderForm.patchValue({
        order_name: (this.addOrderForm.value.id + '-' + nameOrder.substring(0,120)),
        order_payments: "Thanh toán khi nhận hàng",
        order_transport_fee: this.orderTransportFee,
        order_total_price: this.orderPay,
        order_total_price_old: this.orderPay,
        order_prepay: "0",
        bonus_code: this.bonuses?this.maHoa.Encrypt(this.bonus_code):0,
        bonuses: this.bonuses,
        updated_at: '',
        received_date: '',
        status: "Đang chờ",
        client_name: this.maHoa.Encrypt(this.addOrderForm.value.client_name),
        client_phone: this.maHoa.Encrypt(this.addOrderForm.value.client_phone),
        client_address: this.maHoa.Encrypt(this.addOrderForm.value.client_address),
      });
  
      this.serverHttp.putOrder(this.addOrderForm.value).subscribe((data) => {
        if(data)
        {
          this.btnDisabled = false;
          if(this.bonus_code_id != 0)
            this.putBonusCodeId(this.bonus_code_id);
          this.sweetSuccess("Đặt hàng thành công");
          this.router.navigate(['/order']);
          this.serverHttp.cart_length = 0;
        }
      })
    }
    else
    {
      this.sweetWarning("Số lượng không đủ");
    }
  }

  putBonusCodeId(id:number)
  {
    this.serverHttp.putBonusCodeId(id, (Number(this.bonus_code_amount)-1)).subscribe((data) => {
      if(data)
      {
        console.log(data);
      }
    });
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

  sweetSuccessOk(title:string)
  {
    Swal.fire({
      title: title,
      width: 600,
      padding: '3em',
      color: '#716add',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
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
