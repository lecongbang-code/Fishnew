import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from 'src/app/models/Category';
import { EncDecString } from 'src/app/models/EncDecString';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public serverHttp: ServiceService,
  ) { }

  @Input()
  categoris: Category[]=[];
  
  maHoa = new EncDecString;
  public logIn = false;
  public admin = false;

  searchForm = new FormGroup({
    product_name : new FormControl(''),
  });

  replyQuestions:any[]=[];
  replyComments:any[]=[];

  replyTotalComment = 0;
  replyTotalQuestion = 0;
  replyTotalInfor = 0;

  client:any;

  ngOnInit()
  {
    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
        
      if(this.client != null)
      {
        this.client.name = this.maHoa.Decrypt(this.client.name);
        this.logIn = true;
        this.checkOrder(this.client.facebook_id);
        this.getReplyComment();

        if(this.client.status == '1')
        {
          this.admin = true;
        }
      }
    }
  }

  searchProduct()
  {
    this.router.navigate(['/search-product', this.searchForm.value.product_name]);
  }

  checkOrder(id:string)
  {
    this.serverHttp.checkOrder(id).subscribe((data) => {
      if(data.status)
      {
        this.checkOrderCart(data.id);
      }
    })
  }

  checkOrderCart(id:number)
  {
    this.serverHttp.checkOrderCartHeader(id).subscribe((data) => {
      if(data)
      {
        this.serverHttp.cart_length = data.length;
      }
    })
  }

  getReplyComment()
  {
    let client_id = this.client.facebook_id;

    this.serverHttp.getStatusReplyCommentClientId(client_id).subscribe((data) => {
      if(data)
      {
        this.replyComments = data;
        this.replyTotalComment = data.length;
        this.getReplyQuestion();
      }
    })
  }

  changeReplyStatus()
  {
    if(this.replyTotalInfor>0)
    {
      let client_id = this.client.facebook_id;

      this.serverHttp.changeReplyStatus(client_id).subscribe((data) => {
        if(data)
        {
          this.replyTotalQuestion = 0;
          this.replyTotalComment = 0;
          this.replyTotalInfor = 0;
        }
      })
    }
  }

  getReplyQuestion()
  {
    let client_id = this.client.facebook_id;

    this.serverHttp.getStatusReplyQuestionClientId(client_id).subscribe((data) => {
      if(data)
      {
        this.replyQuestions = data;
        this.replyTotalQuestion = data.length;
        this.replyTotalInfor = this.replyTotalQuestion + this.replyTotalComment;
      }
    })
  }

  signOut(): void {
    this.cookieService.deleteAll();
    this.logIn = false;
    this.serverHttp.cart_length=0;
    this.serverHttp.notify_total=0;
    this.router.navigate(['/']);
  }

  sweetSuccess(title:string)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1000
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
