import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../models/Cart';
import { Location } from '@angular/common';
import { ListOrder } from '../models/ListOrder';
import Swal from 'sweetalert2';
import { Footer } from '../models/Footer';
import { EncDecString } from '../models/EncDecString';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order_id = 0;
  carts: Cart[] = [];
  order = <ListOrder>{};
  footer = <Footer>{};

  list_amount_product = [0];
  order_total_price = 0;
  submit_status = true;

  prepay = 0;
  order_total_after_prepay = 0;

  constructor(
    private router: ActivatedRoute, 
    public serverHttp: ServiceService,
    private location: Location,
    private routerL: Router,
  ){}

  ngOnInit(): void {
    this.order_id = this.router.snapshot.params['id'];
    this.getOrder(this.order_id);
  }

  changeNameProduct(item:Cart)
  {
    item.product_name = this.removeAccents(item.product_name);
    this.routerL.navigate(['/product-detail', item.product_name, item.product_id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }
  maHoa = new EncDecString;
  getOrder(id:number)
  {
    this.serverHttp.getOrderId(id).subscribe((data) => {
      if(data)
      {
        this.order = data;
        this.order.client_name = this.maHoa.Decrypt(this.order.client_name);
        this.order.client_phone = this.maHoa.Decrypt(this.order.client_phone);
        this.order.client_address = this.maHoa.Decrypt(this.order.client_address);
        this.order.bonus_code = this.maHoa.Decrypt(this.order.bonus_code);
        this.order_total_after_prepay = Number(this.order.order_total_price_old);
        this.order_total_price = Number(this.order.bonuses) + Number(this.order.order_total_price);
        if(this.order.status == 'Đang chờ')
          this.clientPrepay();
        this.getCart(id);
        this.getFooter();
      }
    })
  }

  getFooter()
  {
    this.serverHttp.getFooter().subscribe((data) => {
      if(data)
      {
        this.footer = data;
      }
    })
  }

  clientPrepay()
  {
    if(this.prepay > 0 && this.prepay <= Number(this.order.order_total_price))
    {
      this.order_total_after_prepay = Number(this.order.order_total_price) - Number(this.prepay);
    }
    else
    {
      this.prepay = 0;
      this.order_total_after_prepay = Number(this.order.order_total_price);
    }
  }

  orderTotalPrice=0;
  getCart(id:number)
  {
    this.serverHttp.getCart(id).subscribe((data) => {
      if(data)
      {
        this.carts = data;
        this.carts.forEach(element => {
          element.product_total_price = (Number(element.product_new_price) * element.product_number).toString();
          this.orderTotalPrice +=  Number(element.product_total_price);
        });

        this.getTotalProduct(this.carts);
      }
    })
  }

  getTotalProduct(carts:Cart[])
  {
    carts.forEach(element => {
      element.product_total_price = (Number(element.product_new_price) * element.product_number).toString();
      this.serverHttp.getProductTotalById(element.product_id).subscribe((data) => {
        if(data)
        {
          this.list_amount_product[element.product_id] = data.amount;
          if(element.product_number > data.amount)
          {
            this.submit_status = false;
          }
        }
      });
    });
  }

  setTotalProduct(carts:Cart[], status:string)
  {
    let i = 0;
    carts.forEach(element => {
      this.serverHttp.setProductTotalById(element.product_id, element.product_number, this.list_amount_product[element.product_id], status).subscribe((data) => {
        if(data)
        {
          //
        }
      });
    });
  }

  public goBack()
  {
    this.location.back();
  }

  finish(id:number)
  {
    this.serverHttp.setStatusOrder(id,'Đã nhận').subscribe((data) => {
      if(data)
      {
        this.carts.forEach(element => {
          this.serverHttp.putCheckComment(element.product_id, this.order.client_id).subscribe((data) => {
            console.log(data);
            if(data)
            {
              console.log("yes put");
            }
            else
            {
              console.log("no put");
              this.postCheckComment(element.product_id, this.order.client_id);
            }
          })
        });
        this.getOrder(this.order_id);
        this.sweetSuccess("Đơn hàng hoàn thành");
      }
    })
  }

  postCheckComment(product_id:number, client_id:string)
  {
    this.serverHttp.postCheckComment(product_id, client_id).subscribe((data) => {
      if(data)
      {
        console.log("yes post");
      }
    })
  }

  confirmFailureOrder(item:ListOrder)
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
          this.setTotalProduct(this.carts, 'cong');
          this.getOrder(this.order_id);
        }
        else
        {
          this.sweetWarning("Hãy nhập lý do bạn muốn hủy");
        }
      }
    })
  }

  public delivery(id:number)
  {
    this.serverHttp.setStatusOrder(id,'Đang giao').subscribe((data) => {
      if(data)
      {
        this.getOrder(this.order_id);
        this.sweetSuccess("Đơn hàng đang giao");
      }
    })
  }

  public confirm(id:number)
  {
    if(this.submit_status)
    {
      this.serverHttp.setStatusOrder(id,'Đang lấy hàng').subscribe((data) => {
        if(data)
        {
          this.putPrepay(id);
          this.setTotalProduct(this.carts, 'tru');
          this.sweetSuccess("Đơn hàng đang lấy");
        }
      })
    }
    else
    {
      this.sweetError("Số lượng không đủ");
    }
  }

  putPrepay(id:number)
  {
    this.serverHttp.putPrepay(id, this.prepay, this.order_total_after_prepay).subscribe((data) => {
      if(data)
      {
        console.log("put prepay", data);
      }
      this.getOrder(this.order_id);
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
    item.client_note = "Lý do đơn hàng bị hủy: " + str;
    this.serverHttp.putCancelOrder(item).subscribe((data) => {
      if(data)
      {
        this.getOrder(this.order_id);
        this.sweetSuccess("Hủy thành công");
      }
      else
      {
        this.sweetError("Hủy thất bại");
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
