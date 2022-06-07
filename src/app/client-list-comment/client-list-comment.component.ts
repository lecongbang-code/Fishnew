import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Comment_ } from '../models/Comment_';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-client-list-comment',
  templateUrl: './client-list-comment.component.html',
  styleUrls: ['./client-list-comment.component.css']
})
export class ClientListCommentComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  totalLength: any;
  pageComment = 1;

  comments: Comment_[] = [];
  replyComments: any[] = [];

  client:any;
  ngOnInit(): void {
    this.client = JSON.parse(this.cookieService.get('client')!);
    this.getComment();
  }

  changeNameProduct(item:Comment_)
  {
    item.product_name = this.removeAccents(item.product_name);
    this.router.navigate(['/product-detail', item.product_name, item.product_id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  getComment()
  {
    this.serverHttp.getCommentClientId(this.client.facebook_id).subscribe((data) => {
      if(data)
      {
        this.comments = data;
        this.getReplyComment();
      }
    })
  }

  getReplyComment()
  {
    this.serverHttp.getReplyCommentClientId(this.client.facebook_id).subscribe((data) => {
      if(data)
      {
        this.replyComments = data;
      }
    })
  }
}
