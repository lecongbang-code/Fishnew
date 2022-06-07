import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-client-slider',
  templateUrl: './client-slider.component.html',
  styleUrls: ['./client-slider.component.css']
})
export class ClientSliderComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}
  
  sliders:Product[]=[];

  @Input()
  categoris: Category[]=[];
  
  ngOnInit(): void {
    this.getProductClientRandom();
  }

  changeNameProduct(item:Product)
  {
    item.name = this.removeAccents(item.name);
    this.router.navigate(['/product-detail', item.name, item.id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  getProductClientRandom()
  {
    this.serverHttp.getProductClientRandom().subscribe((data) => {
      if(data)
      {
        this.sliders = data;
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
