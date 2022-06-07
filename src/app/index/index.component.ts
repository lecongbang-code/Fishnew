import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { ServiceService } from '../services/service.service';

import {enableProdMode} from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../models/Footer';
import { Title } from '@angular/platform-browser';

enableProdMode();

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private titleService: Title,
    public cd: ChangeDetectorRef,
    public serverHttp: ServiceService,
    public router: Router,
  ) { }

  newProduct = 'SẢN PHẨM MỚI';

  randomProduct = 'SẢN PHẨM NGẪU NHIÊN';

  categoris: Category[]=[];
  footer = <Footer>{};

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    this.setTitle("Fish new");

    this.getCategory();

    let date = new Date().getTime();
    let view = Number(localStorage.getItem('view'));
    if(view == 0)
    {
      this.autoView(view);
    }
    else
    {
      let tiemView = Number(localStorage.getItem('view'));
      let expirationDate = new Date(tiemView).getTime();
      this.autoView(expirationDate - date);
    }
  }

  autoView(expirationDate: number)
  {
    setTimeout(()=> {
        this.postView();
    }, expirationDate);
  }

  data:any;
  postView()
  {
    this.serverHttp.postView(this.data).subscribe((data) => {
      if(data)
      {
        let date = new Date().getTime();
        localStorage.setItem('view', (date + 5*60*1000).toString());
      }
    })
  }

  getCategory()
  {
    this.serverHttp.getCategory().subscribe((data) => {
      if(data)
      {
        this.categoris = data;
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
        localStorage.setItem("footer", JSON.stringify(data));
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
