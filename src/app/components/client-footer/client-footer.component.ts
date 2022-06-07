import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Footer } from 'src/app/models/Footer';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.css']
})

export class ClientFooterComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
  ){}

  @Input()
  footer = <Footer>{};

  @Input()
  categoris: Category[]=[];

  footerLocal = true;

  ngOnInit(): void {
    if(this.footer)
    {
      this.footerLocal = false;
    }
  }

  onActivate() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
