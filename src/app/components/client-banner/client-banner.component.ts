import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Banner } from 'src/app/models/Banner';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Category } from 'src/app/models/Category';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-banner',
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.css']
})

export class ClientBannerComponent implements OnInit {

  config: AngularEditorConfig = {
    height: 'auto',
    minHeight: '50px',
    maxHeight: '80px',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    showToolbar: false,
  };
  
  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  banners: Banner[]=[];
  categoris:Category[]=[];
  product_news: Product[]=[];

  ngOnInit(): void {
    this.getBanner();
  }

  changeNameProduct(item:Banner)
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
  
  getBanner()
  {
    this.serverHttp.getBanner().subscribe((data) => {
      if(data)
      {
        this.banners = data;
        this.getProductNewLimit();
      }
    })
  }

  getProductNewLimit()
  {
    this.serverHttp.getProductNewLimit().subscribe((data) => {
      if(data)
      {
        this.product_news = data;
        this.getCategory();
      }
    })
  }

  getCategory()
  {
    this.serverHttp.getCategory().subscribe((data) => {
      if(data)
      {
        this.categoris = data;
      }
    })
  }
}
