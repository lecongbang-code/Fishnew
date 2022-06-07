import { Component, OnInit } from '@angular/core';
import { ListOrder } from '../models/ListOrder';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EncDecString } from '../models/EncDecString';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(public serverHttp: ServiceService,
    private router: Router,
    ){}

  public listOrder: ListOrder[] = [];
  
  public listOrder_copy = this.listOrder;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  ngOnInit(): void {
    this.getOrder();
    
    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.select_value = value.trim().toLowerCase();
      this.listOrder = this.listOrder_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listOrder = this.listOrder_copy.filter(data => data.id.toString().toLowerCase().includes(this.find_text));
    })
  }

  maHoa = new EncDecString;
  getOrder()
  {
    this.serverHttp.getOrderD().subscribe((data) => {
      if(data)
      {
        this.listOrder = data;
        this.listOrder.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
          element.client_phone = this.maHoa.Decrypt(element.client_phone);
          element.client_address = this.maHoa.Decrypt(element.client_address);
          element.bonus_code = this.maHoa.Decrypt(element.bonus_code);
        });
        this.listOrder_copy = this.listOrder;
        this.select_value_filter_control.next(this.select_value);
      }
    })
  }

  changeSelectStatus(select_value:string){
    this.select_value = select_value;
    this.select_value_filter_control.next(this.select_value);
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
}
