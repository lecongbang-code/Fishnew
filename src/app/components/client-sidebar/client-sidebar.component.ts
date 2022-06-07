import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Footer } from 'src/app/models/Footer';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.css']
})

export class ClientSidebarComponent implements OnInit {

  constructor(){}

  @Input()
  categoris: Category[]=[];

  ngOnInit(): void {
 
  }

  onActivate() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
