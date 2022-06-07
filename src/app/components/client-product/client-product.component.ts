import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-client-product',
  templateUrl: './client-product.component.html',
  styleUrls: ['./client-product.component.css']
})
export class ClientProductComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  public totalLength: any;
  public page: number = 1;
  
  @Input()
  title:string = '';

  @Input()
  categoris: Category[]=[];

  @Input()
  categoryId:number = 0;

  products:Product[]=[];
  slider:Product[]=[];
  
  ngOnInit(): void {
    if(this.title == 'SẢN PHẨM MỚI')
    {
      this.getProductNew();
    }
    else if(this.title == 'SẢN PHẨM NGẪU NHIÊN')
    {
      this.getProductRandom()
    }
    else
    {
      this.getProductByCategory(this.categoryId)
    }
  }

  changeNameProduct(item:Product)
  {
    item.name = this.removeAccents(item.name);
    this.router.navigate(['/product-detail', item.name, item.id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  getProductNew()
  {
    this.serverHttp.homeGetProductNew().subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  getProductRandom()
  {
    this.serverHttp.homeGetProductRandom().subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  getProductByCategory(id:number)
  {
    this.serverHttp.homeGetProductByCategory(id).subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }

  onActivate() {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
  }

}
