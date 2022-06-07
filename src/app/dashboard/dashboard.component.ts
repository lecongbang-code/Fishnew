import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/Client';
import { EncDecString } from '../models/EncDecString';
import { Product } from '../models/Product';
import { Report } from '../models/Report';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}
  
  view:any[]=[];
  lengthClient = 0;
  lengthCategory = 0;
  lengthEvent = 0;
  lengthProduct = 0;
  lengthOrderSuccess = 0;
  lengthSex = 0;
  lengthSize = 0;
  lengthColor = 0;
  lengthOrder = 0;
  lengthComment = 0;
  lengthQuestion = 0;
  lengthReport = 0;
  reports: Report[] = [];
  products: Product[] = [];
  clients: Client[] = [];

  public totalLength: any;
  public page: number = 1;

  maHoa = new EncDecString;
  ngOnInit(): void {
    this.getCategory();
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

  getView()
  {
    this.serverHttp.getView().subscribe((data) => {
      if(data)
      {
        this.view = data;
        this.getOrder();
      }
    })
  }

  getClient()
  {
    this.serverHttp.getClient().subscribe((data) => {
      if(data){
        this.lengthClient = data.length;
        this.clients = data;
        this.clients.forEach(element => {
          element.name = this.maHoa.Decrypt(element.name);
          element.phone = this.maHoa.Decrypt(element.phone);
        });
        this.getQuestion();
      }
    })
  }

  getOrder()
  {
    this.serverHttp.getOrderD().subscribe((data) => {
      if(data){
        this.lengthOrder = data.length;
        this.getOrderSuccess();
      }
    })
  }

  getOrderSuccess()
  {
    this.serverHttp.getOrderSuccess().subscribe((data) => {
      if(data){
        this.lengthOrderSuccess = data.length;
        this.getClient();
      }
    })
  }

  getComment()
  {
    this.serverHttp.getComment().subscribe((data) => {
      if(data){
        this.lengthComment = data.length;
        this.getReport();
      }
    })
  }

  getQuestion()
  {
    this.serverHttp.getQuestion().subscribe((data) => {
      if(data){
        this.lengthQuestion = data.length;
        this.getComment();
      }
    })
  }

  getReport()
  {
    this.serverHttp.getReport().subscribe((data) => {
      if(data){
        this.lengthReport = data.length;
        this.getReportLimit();
      }
    })
  }

  getReportLimit()
  {
    this.serverHttp.getReportLimit().subscribe((data) => {
      if(data){
        this.reports = data;
        this.getProductLimit();
      }
    })
  }

  getProductLimit()
  {
    this.serverHttp.getProductLimit().subscribe((data) => {
      if(data){
        this.products = data;
      }
    })
  }

  getCategory()
  {
    this.serverHttp.getCategory().subscribe((data) => {
      if(data){
        this.lengthCategory = data.length;
        this.getEvent();
      }
    })
  }

  getEvent()
  {
    this.serverHttp.getEvent().subscribe((data) => {
      if(data){
        this.lengthEvent = data.length;
        this.getProduct();
      }
    })
  }

  getProduct()
  {
    this.serverHttp.getProduct().subscribe((data) => {
    if(data){
      this.lengthProduct = data.length;
      this.getSex();
    }
    })
  }

  getSex()
  {
    this.serverHttp.getSex().subscribe((data) => {
      if(data){
        this.lengthSex = data.length;
        this.getSize();
      }
    })
  }

  getSize()
  {
    this.serverHttp.getSize().subscribe((data) => {
      if(data){
        this.lengthSize = data.length;
        this.getColor();
      }
    })
  }

  getColor()
  {
    this.serverHttp.getColor().subscribe((data) => {
      if(data){
        this.lengthColor = data.length;
        this.getView();
      }
    })
  }
}