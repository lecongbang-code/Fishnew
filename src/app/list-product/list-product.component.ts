import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { FormGroup, FormBuilder, FormControl }  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Product } from '../models/Product';
import { SexProduct } from '../models/Sex';
import { SizeProduct } from '../models/Size';
import { ColorProduct } from '../models/Color';
import { Category } from '../models/Category';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  config: AngularEditorConfig = {
    height: 'auto',
    minHeight: '50px',
    maxHeight: '50px',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    showToolbar: false,
  };
  
  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public listProduct: Product[] = [];

  public listProduct_copy = this.listProduct;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';
  

  public select_value_banner_filter_control = new Subject<string>();
  public select_value_banner = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  public listSex: SexProduct[] = [];
  public listSize: SizeProduct[] = [];
  public listColor: ColorProduct[] = [];

  public listCategory: Category[] = [];

  ngOnInit(): void {

    this.getProduct();
    this.getSex();
    this.getSize();
    this.getColor();
    this.getCategory();

    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
        this.select_value = value.trim().toLowerCase();
        this.listProduct = this.listProduct_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.select_value_banner_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
        this.select_value_banner = value.trim().toLowerCase();
        this.listProduct = this.listProduct_copy.filter(data => data.banner_status.toString().toLowerCase().includes(this.select_value_banner));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listProduct = this.listProduct_copy.filter(data => data.id.toString().toLowerCase().includes(this.find_text));
    })
  }

  changeNameProduct(item:Product)
  {
    item.name = this.removeAccents(item.name);
    this.router.navigate(['/product-detail', item.name, item.id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }
  
  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }

  getProduct()
  {
    this.serverHttp.getProductP().subscribe((data) => {
      if(data){
        this.listProduct = data;
        this.listProduct_copy = this.listProduct;
        this.select_value_filter_control.next(this.select_value);
      }
    })
  }

  getSex()
  {
    this.serverHttp.getSexProduct().subscribe((data) => {
      if(data){
        this.listSex = data;
      }
    })
  }

  getCategory()
  {
    this.serverHttp.getCategoryP().subscribe((data) => {
      if(data){
        this.listCategory = data;
      }
    })
  }

  getSize()
  {
    this.serverHttp.getSizeProduct().subscribe((data) => {
      if(data){
        this.listSize = data;
      }
    })
  }

  getColor()
  {
    this.serverHttp.getColorProduct().subscribe((data) => {
      if(data){
        this.listColor = data;
      }
    })
  }

  changeSelectStatus(select_value:string){
    this.select_value = select_value;
    this.select_value_filter_control.next(this.select_value);
  }

  changeSelectBannerStatus(select_value:string){
    this.select_value_banner = select_value;
    this.select_value_banner_filter_control.next(this.select_value_banner);
  }

  deleteConfirmed(id:number)
  {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(id);
      }
    })
  }

  deleteProduct(id:number)
  {
    this.serverHttp.deleteProduct(id).subscribe((data) => {
      if(data){
        this.getProduct();
        this.sweetSuccess("Xóa thành công");
      }
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
