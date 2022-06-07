import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Category } from '../models/Category';
import { ColorProduct } from '../models/Color';
import { Comment_, ReplyComment } from '../models/Comment_';
import { EncDecString } from '../models/EncDecString';
import { ListOrder } from '../models/ListOrder';
import { Product } from '../models/Product';
import { Question_, ReplyQuestion } from '../models/Question_';
import { SexProduct } from '../models/Sex';
import { SizeProduct } from '../models/Size';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: ActivatedRoute, 
    public serverHttp: ServiceService,
    private cookieService: CookieService,
    private routerL: Router,
    private meta: Meta,
  ) { }

  config: AngularEditorConfig = {
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    showToolbar: false,
  };
  
  product_id = 0;
  product = <Product>{};

  public listSex: SexProduct[] = [];
  public listSize: SizeProduct[] = [];
  public listColor: ColorProduct[] = [];

  public category = <Category>{};
  public questions: Question_[]=[];
  public comments: Comment_[]=[];
  public reply_questions: ReplyQuestion[]=[];
  public reply_comments: ReplyComment[]=[];

  urlImageProduct = '';
  showImage = true;
  number = 1;

  urlWeb = '';
  urlShare = '';
  totalSele = 0;

  datePipe: DatePipe = new DatePipe('en-US');
  
  addCartForm = new FormGroup({
    id : new FormControl(''),
    order_id : new FormControl(''),
    product_id : new FormControl(''),
    product_name : new FormControl(''),
    product_image_path : new FormControl(''),
    product_sex : new FormControl(''),
    product_size : new FormControl(''),
    product_color : new FormControl(''),
    product_number : new FormControl(''),
    product_old_number : new FormControl(''),
    product_old_price : new FormControl(''),
    product_dis_price : new FormControl(''),
    product_new_price : new FormControl(''),
  });

  addQuestionForm = new FormGroup({
    client_id: new FormControl(''),
    client_name: new FormControl(''),
    avatar: new FormControl(''),
    product_id: new FormControl(''),
    product_img: new FormControl(''),
    product_name: new FormControl(''),
    content: new FormControl(''),
    reply_status: new FormControl(''),
    status: new FormControl(''),
    created_at: new FormControl(''),
  });

  addReplyQuestionForm = new FormGroup({
    question_id: new FormControl(''),
    question_client_id: new FormControl(''),
    client_id: new FormControl(''),
    product_id: new FormControl(''),
    client_name: new FormControl(''),
    avatar: new FormControl(''),
    content: new FormControl(''),
    reply_status: new FormControl(''),
    status: new FormControl(''),
    created_at: new FormControl(''),
  });

  addCommentForm = new FormGroup({
    client_id: new FormControl(''),
    client_name: new FormControl(''),
    avatar: new FormControl(''),
    product_id: new FormControl(''),
    product_name: new FormControl(''),
    product_img: new FormControl(''),
    content: new FormControl(''),
    rating: new FormControl('1'),
    reply_status: new FormControl(''),
    status: new FormControl(''),
    created_at: new FormControl(''),
  });

  addReplyCommentForm = new FormGroup({
    comment_id: new FormControl(''),
    comment_client_id: new FormControl(''),
    client_id: new FormControl(''),
    client_name: new FormControl(''),
    avatar: new FormControl(''),
    product_id: new FormControl(''),
    content: new FormControl(''),
    reply_status: new FormControl(''),
    status: new FormControl(''),
    created_at: new FormControl(''),
  });

  btnDisabled = false;

  myAvatar = '';
  login = false;
  admin = false;

  totalRating = 0.0;

  goCart = false;

  client_id = '';

  client:any;

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      if(this.client != null)
      {
        this.myAvatar = this.client.avatar;
        this.login = this.client.facebook_id?true:false;
        this.admin = this.client.status=='1'?true:false;
      }
    }

    this.setTitle("Chi tiết sản phẩm ... ");

    this.getCategory();

    this.router.paramMap.subscribe((params: ParamMap) => {
      this.product.category_id = 0;
      this.totalRating = 0.0;
      this.product_id = this.router.snapshot.params['id'];
      this.urlWeb = this.routerL.url;
      this.getProductId(this.product_id);
      this.getSex(this.product_id);
      this.getSize(this.product_id);
      this.getColor(this.product_id);
      this.showImage = true;
      this.statusInfor = '1';
    });
  }

  updateMetaProduct()
  {
    var title = this.product.name;
    var url = window.location.href;
    this.urlShare = url;
    var description = this.product.description;
    var image = this.product.image_path_1;

    this.meta.updateTag({property:'og:title', content:title});
    this.meta.updateTag({property:'og:url', content:url});
    this.meta.updateTag({property:'og:description', content:description});
    this.meta.updateTag({property:'og:image', content:image});
  }

  plusAmount()
  {
    if(this.number < 999)
      this.number ++;
  }

  minusAmount()
  {
    if(this.number > 1)
      this.number --;
  }

  getProductId(id:number)
  {
    this.serverHttp.getProductId(id).subscribe((data) => {
      if(data)
      {
        this.product = data;
        this.totalSele =  this.product.amount_total - this.product.amount;
        this.urlImageProduct = this.product.image_path_1;
        this.getCategoryId(this.product.category_id);
        this.setTitle("Chi tiết sản phẩm - " + this.product.name);
        this.updateMetaProduct();
      }
    })
  }

  changeImage(url:string)
  {
    this.showImage = true;
    this.urlImageProduct = url;
  }

  addCart(item:Product , goCart:boolean)
  {
    this.goCart = goCart;
    if(this.client == null)
    {
      this.sweetWarning("Bạn cần phải đăng nhập");
    }
    else
    {
      this.client_id = this.client.facebook_id;
      this.addCartForm.patchValue({
        orfer_id : '',
        product_id : item.id,
        product_name : item.name,
        product_image_path : item.image_path_1,
        product_old_price : item.old_price,
        product_dis_price : item.discount,
        product_new_price : item.new_price,
      });

      this.checkOrder(this.client_id);
    }
  }

  statusInfor = '1';
  changeStatusInfor(str:string)
  {
    if(str == '1')
    {
      this.statusInfor = '1';
    }
    else if(str == '2')
    {
      this.statusInfor = '2';
    }
    else
    {
      this.statusInfor = '3';
    }
  }

  changeVideo()
  {
    this.showImage = false;
  }

  getSex(id:number)
  {
    this.serverHttp.getSexProductId(id).subscribe((data) => {
      if(data){
        this.listSex = data;
        this.addCartForm.patchValue({
          product_sex : this.listSex[0].name,
        });
      }
    })
  }

  getCategoryId(id:number)
  {
    this.serverHttp.getCategoryId(id).subscribe((data) => {
      if(data){
        this.category = data;
      }
    })
  }

  sameKind = 'SẢN PHẨM CÙNG LOẠI';
  categoris: Category[]=[];
  getCategory()
  {
    this.serverHttp.getCategory().subscribe((data) => {
      if(data)
      {
        this.categoris = data;
      }
    })
  }

  getSize(id:number)
  {
    this.serverHttp.getSizeProductId(id).subscribe((data) => {
      if(data){
        this.listSize = data;
        this.addCartForm.patchValue({
          product_size : this.listSize[0].name,
        });
      }
    })
  }

  getColor(id:number)
  {
    this.serverHttp.getColorProductId(id).subscribe((data) => {
      if(data){
        this.listColor = data;
        this.addCartForm.patchValue({
          product_color : this.listColor[0].name,
        });
        this.getQuestionProductId();
        this.getCommentProductId();
      }
    })
  }

  getCommentProductId()
  {
    let i = 0;
    this.serverHttp.getCommentProductId(this.product_id).subscribe((data) => {
      if(data){
        this.comments = data;
        this.comments.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
          i++;
          this.totalRating += element.rating;
          if(i == this.comments.length)
          {
            this.totalRating = Math.round(this.totalRating/this.comments.length);
          }
        });
        this.getReplyCommentProductId();
      }
    })
  }

  getReplyCommentProductId()
  {
    this.serverHttp.getReplyCommentProductId(this.product_id).subscribe((data) => {
      if(data){
        this.reply_comments = data;
        this.reply_comments.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
        });
        this.checkCommentProductId();
      }
    })
  }

  maHoa = new EncDecString;

  getQuestionProductId()
  {
    this.serverHttp.getQuestionProductId(this.product_id).subscribe((data) => {
      if(data){
        this.questions = data;
        this.questions.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
        });
        this.getReplyQuestionProductId();
      }
    })
  }

  getReplyQuestionProductId()
  {
    this.serverHttp.getReplyQuestionProductId(this.product_id).subscribe((data) => {
      if(data){
        this.reply_questions = data;
        this.reply_questions.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
        });
      }
    })
  }

  checkOrder(client_id:string)
  {
    this.btnDisabled = true;
    this.serverHttp.checkOrder(client_id).subscribe((data) => {
      if(data.status)
      {
        this.addCartForm.patchValue({
          order_id : data.id,
        });

        this.checkOrderCart();
      }
      else
      {
        this.postOrder(client_id);
      }
    })
  }

  checkOrderCart()
  {
    this.serverHttp.checkOrderCart(this.addCartForm.value).subscribe((data) => {
      if(data.id)
      {
        this.addCartForm.patchValue({
          id : data.id,
          product_old_number : data.product_number,
        });
        this.putOderCart()
      }
      else
      {
        this.postOderCart()
      }
    })
  }

  putOderCart()
  {
    this.serverHttp.putOderCart(this.addCartForm.value).subscribe((data) => {
      if(data)
      {
        this.goToCart();
        this.sweetSuccess("Thêm giỏ hàng thành công");
      }
      else
      {
        this.putOderCart();
      }
      this.btnDisabled = false;
    })
  }

  postOderCart()
  {
    this.serverHttp.postOderCart(this.addCartForm.value).subscribe((data) => {
      if(data)
      {
        this.goToCart();
        this.serverHttp.cart_length ++;
        this.sweetSuccess("Thêm giỏ hàng thành công");
      }
      this.btnDisabled = false;
    })
  }

  order = <ListOrder>{}
  postOrder(client_id:string)
  {
    this.serverHttp.postOrder(client_id, this.order).subscribe((data) => {
      if(data.id)
      {
        this.addCartForm.patchValue({
          order_id : data.id,
        });

        this.checkOrderCart();
      }
    })
  }

  addQuestion()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    var transformTime = this.datePipe.transform(date, 'shortTime');

    this.addQuestionForm.patchValue({
      client_id: this.client.facebook_id,
      client_name: this.client.name,
      avatar: this.myAvatar,
      product_id: this.product.id,
      product_img: this.product.image_path_1,
      product_name: this.product.name,
      reply_status: 0,
      status: 1,
      created_at: transformTime +" "+ transformDate,
    });

    this.serverHttp.postQuestion(this.addQuestionForm.value).subscribe((data) => {
      if(data)
      {
        this.getQuestionProductId();
        this.addQuestionForm.reset();
        this.sweetSuccess("Gửi thành công");
      }
    })
  }

  addComment()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    var transformTime = this.datePipe.transform(date, 'shortTime');

    this.addCommentForm.patchValue({
      client_id: this.client.facebook_id,
      client_name: this.client.name,
      avatar: this.myAvatar,
      product_id: this.product.id,
      product_img: this.product.image_path_1,
      product_name: this.product.name,
      reply_status: 0,
      status: 1,
      created_at: transformTime +" "+ transformDate,
    });

    this.serverHttp.postComment(this.addCommentForm.value).subscribe((data) => {
      if(data)
      {
        this.putCheckComment(this.addCommentForm.value);
        this.addCommentForm.reset();
        this.sweetSuccess("Đánh giá thành công");
      }
    })
  }

  acReply = false;
  nameReplyQuestion = '';

  changeAcReply(item:Question_)
  {
    this.acReply = true;
    this.nameReplyQuestion = item.client_name;
    this.addReplyQuestionForm.patchValue({
      question_id : item.id,
      question_client_id : item.client_id,
    });
  }

  check_comments: any[] =[];
  idCheckComment = 0;
  checkComment = false;
  checkCommentProductId()
  {
    this.serverHttp.checkCommentProductId(this.product_id).subscribe((data) => {
      if(data)
      {
        this.check_comments = data;
        this.check_comments.forEach(element => {
          if(element.client_id == this.client.facebook_id)
          {
            this.checkComment = true;
            this.idCheckComment = element.id
          }
        });
      }
    })
  }

  putCheckComment(id:number)
  {
    this.serverHttp.putCheckCommentProductId(id).subscribe((data) => {
      if(data)
      {
        this.checkComment = false;
        this.getCommentProductId();
      }
    })
  }

  acReplyComment = false;
  
  nameReplyComment = '';
  changeAcReplyComment(item:Comment_)
  {
    this.acReplyComment = true;
    this.nameReplyComment = item.client_name;
    this.addReplyCommentForm.patchValue({
      comment_id : item.id,
      comment_client_id : item.client_id,
    });
  }

  deleteQuestion(id:number)
  {
    this.serverHttp.deleteQuestion(id).subscribe((data) => {
      if(data)
      {
        this.getQuestionProductId();
        this.sweetSuccess("Xóa thành công");
      }
    })
  }

  deleteComment(id:number)
  {
    this.serverHttp.deleteComment(id).subscribe((data) => {
      if(data)
      {
        this.getCommentProductId();
        this.sweetSuccess("Xóa thành công");
      }
    })
  }

  addReplyQuestion()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    var transformTime = this.datePipe.transform(date, 'shortTime');

    this.addReplyQuestionForm.patchValue({
      client_id: this.client.facebook_id,
      client_name: this.client.name,
      avatar: this.myAvatar,
      product_id: this.product.id,
      reply_status: 0,
      status: 1,
      created_at: transformTime +" "+ transformDate,
    });

    this.serverHttp.postReplyQuestion(this.addReplyQuestionForm.value).subscribe((data) => {
      if(data)
      {
        this.getQuestionProductId();
        this.addReplyQuestionForm.reset();
        this.acReply = false;
        this.sweetSuccess("Gửi thành công");
      }
    })
  }

  addReplyComment()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    var transformTime = this.datePipe.transform(date, 'shortTime');

    this.addReplyCommentForm.patchValue({
      client_id: this.client.facebook_id,
      client_name: this.client.name,
      avatar: this.myAvatar,
      product_id: this.product.id,
      reply_status: 0,
      status: 1,
      created_at: transformTime +" "+ transformDate,
    });

    this.serverHttp.postReplyComment(this.addReplyCommentForm.value).subscribe((data) => {
      if(data)
      {
        this.getCommentProductId();
        this.addReplyCommentForm.reset();
        this.acReplyComment = false;
        this.sweetSuccess("Gửi thành công");
      }
    })
  }

  goToCart()
  {
    if(this.goCart)
    {
      this.routerL.navigate(['/cart']);
    }
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
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

  sweetWarning(title:string)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  }

  sweetError(title:string)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  }

}
