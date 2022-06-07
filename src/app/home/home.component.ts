import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta,
  ) { }
  
  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("Fish new - Cửa hàng bán cá betta, guppy giá rẻ");
  }
}
