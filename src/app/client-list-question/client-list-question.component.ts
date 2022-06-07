import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Comment_ } from '../models/Comment_';
import { Question_ } from '../models/Question_';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-client-list-question',
  templateUrl: './client-list-question.component.html',
  styleUrls: ['./client-list-question.component.css']
})
export class ClientListQuestionComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private cookieService: CookieService,
    public router: Router,
    private meta: Meta,
    private titleService: Title,
  ) { }

  questions: Question_[] = [];
  replyQuestions: any[] = [];

  public totalLength: any;
  public page: number = 1;

  client:any;
  ngOnInit(): void {
    this.setTitle("Thông báo của bạn");

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      this.getQuestion();
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  changeNameProduct(item:Question_)
  {
    item.product_name = this.removeAccents(item.product_name);
    this.router.navigate(['/product-detail', item.product_name, item.product_id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  getQuestion()
  {
    this.serverHttp.getQuestionClientId(this.client.facebook_id).subscribe((data) => {
      if(data)
      {
        this.questions = data;
        this.getReplyQuestion();
      }
    })
  }

  getReplyQuestion()
  {
    this.serverHttp.getReplyQuestionClientId(this.client.facebook_id).subscribe((data) => {
      if(data)
      {
        this.replyQuestions = data;
      }
    })
  }

}
