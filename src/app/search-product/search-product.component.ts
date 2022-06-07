import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  constructor(
    private router: ActivatedRoute, 
    private titleService: Title,
    public serverHttp: ServiceService,
    private routerL: Router,private meta: Meta,
  ) { }

  public find_text_filter_control = new Subject<string>();
  public find_text = '';
  
  public totalLength: any;
  public page: number = 1;

  nameProduct = '';

  products:Product[]=[];
  products_copy:Product[]=[];
  categoris:Category[]=[];
  
  ngOnInit(): void {
    this.setTitle("Tìm kiếm sản phẩm");

    this.router.paramMap.subscribe((params: ParamMap) => {
      this.nameProduct = this.router.snapshot.params['name'];
      this.getCategory();
      this.getProductNew();
    });

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.products = this.products_copy.filter(data => data.name.toString().toLowerCase().includes(this.find_text));
    })
  }

  changeNameProduct(item:Product)
  {
    item.name = this.removeAccents(item.name);
    this.routerL.navigate(['/product-detail', item.name, item.id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
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

  getProductNew()
  {
    this.serverHttp.homeGetProductNew().subscribe((data) => {
      if(data)
      {
        this.products = data;
        this.products_copy = this.products;
        this.find_text = this.nameProduct;
        this.find_text_filter_control.next(this.find_text);
      }
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
