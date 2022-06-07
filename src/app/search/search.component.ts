import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  constructor(
    private router: ActivatedRoute, 
    public serverHttp: ServiceService,
    private titleService: Title,
    private routerL: Router,
    private meta: Meta,
  ) { }
  
  nameSearch = '';

  public totalLength: any;
  public page: number = 1;

  products:Product[]=[];
  categoris:Category[]=[];
  
  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.nameSearch = this.router.snapshot.params['name'];
      this.searchProduct();
    });
  }

  changeNameProduct(item:Product)
  {
    item.name = this.removeAccents(item.name);
    this.routerL.navigate(['/product-detail', item.name, item.id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  searchProduct()
  {
    this.checkParam();
  }

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  checkParam()
  {
    if(this.nameSearch == 'new-product')
    {
      this.nameSearch = 'Sản phẩm mới';
      this.setTitle("Tìm kiếm - " + this.nameSearch);
      this.getProductNew();
    }
    else if(this.nameSearch == 'hot-product')
    {
      this.nameSearch = 'Sản phẩm hot';
      this.setTitle("Tìm kiếm - " + this.nameSearch);
      this.getProductHot();
    }
    else if(this.nameSearch == 'price-up')
    {
      this.nameSearch = 'Giá tăng dần';
      this.setTitle("Tìm kiếm - " + this.nameSearch);
      this.getProductPriceUp();
    }
    else if(this.nameSearch == 'price-down')
    {
      this.nameSearch = 'Giá giảm dần';
      this.setTitle("Tìm kiếm - " + this.nameSearch);
      this.getProductPriceDown();
    }
    else if(this.nameSearch == 'big-discount')
    {
      this.nameSearch = 'Giảm giá mạnh';
      this.setTitle("Tìm kiếm - " + this.nameSearch);
      this.getProductBigDiscount();
    }
    else
    {
      this.setTitle("Tìm kiếm - " + this.nameSearch);
      this.getProductByCategory(this.nameSearch)
    }
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

  getProductHot()
  {
    this.serverHttp.homeGetProductHot().subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  getProductPriceUp()
  {
    this.serverHttp.homeGetProductPriceUp().subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  getProductPriceDown()
  {
    this.serverHttp.homeGetProductPriceDown().subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  getProductBigDiscount()
  {
    this.serverHttp.homeGetProductBigDiscount().subscribe((data) => {
      if(data)
      {
        this.products = data;
      }
    })
  }

  getProductByCategory(name:string)
  {
    this.getCategory(name);
  }

  getCategory(name:string)
  {
    this.serverHttp.getCategory().subscribe((data) => {
      if(data)
      {
        this.categoris = data;
        this.categoris.forEach(e => {
          if(e.name.toLowerCase() == name)
          {
            this.serverHttp.homeGetProductByCategory(e.id).subscribe((data) => {
              if(data)
              {
                this.products = data;
              }
            })
          }
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

  onActivate() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
