import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Report } from '../models/Report';
// import { Question } from './models/Question_';
import { Comment_, ReplyComment } from '../models/Comment_';
import { Category } from '../models/Category';
import { Client, NewClient } from '../models/Client';
import { Product } from '../models/Product';
import { Footer } from '../models/Footer';
import { Color, ColorProduct } from '../models/Color';
import { Size, SizeProduct } from '../models/Size';
import { Sex, SexProduct } from '../models/Sex';
import { ListOrder } from '../models/ListOrder';
import { Cart } from '../models/Cart';
import { Banner } from '../models/Banner';
import { Event_ } from '../models/Event_';
import { Question_, ReplyQuestion } from '../models/Question_';
import { Admin } from '../models/Admin';
import { DatePipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  // private REST_API_SERVER = 'http://localhost/Fishnew_Api/public/api';

  private REST_API_SERVER = 'https://fishnew.tk/Fishnew_Api/public/api';


  public cart_length = 0;

  public notify_total = 0;

  putForgot(data:any): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_forgot`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putEventCode(data:any): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_event_code`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCaptchaElemKey(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_captcha_elem_key`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  login(data:Admin): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/admin_login`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  clientLogin(data:any): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/client_login`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColor(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_color`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColorId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_color/${id}`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postColor(data:Color): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_color`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putColor(id:number, data:Color): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_color/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getSex(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_sex`;
    return this.httpClient.get<Sex>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSexId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_sex/${id}`;
    return this.httpClient.get<Sex>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postSex(data:Sex): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_sex`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSize(): Observable<any>
    {
      
      const url = `${this.REST_API_SERVER}/get_size`;
      return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
    }
  
    getSizeId(id:number): Observable<any>
    {
      
      const url = `${this.REST_API_SERVER}/get_size/${id}`;
      return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
    }
  
    postSize(data:Size): Observable<any>
    {
      
      const url = `${this.REST_API_SERVER}/post_size`;
      return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
    }
  
    putSize(id:number, data:Size): Observable<any>
    {
      
      console.log("id: ", id);
      console.log("data: ", data);
      const url = `${this.REST_API_SERVER}/put_size/${id}`;
      return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
    }
  
    deleteSize(id: number)
    {
      
      const url = `${this.REST_API_SERVER}/delete_size/${id}`;
      return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
    }
  putSex(id:number, data:Sex): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_sex/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteSex(id: number)
  {
    
    const url = `${this.REST_API_SERVER}/delete_sex/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteColor(id: number)
  {
    
    const url = `${this.REST_API_SERVER}/delete_color/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getBanner(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_product_banner`;
    return this.httpClient.get<Banner>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getEvent(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_event_bonus_code`;
    return this.httpClient.get<Event_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductNewLimit(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_product_new_limit`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCategoryLimit(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_category_limit`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putFooter(id:number, data:Footer): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_footer/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  homeGetProductNew(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/home_get_product_new`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  homeGetProductRandom(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/home_get_product_random`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  homeGetProductByCategory(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/home_get_product_by_category/${id}`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getCategory(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_category_client`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getClientId(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_client_home/${id}`;
    return this.httpClient.get<Client>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getAdminId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_admin/${id}`;
    return this.httpClient.get<Client>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductClient(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_product_client`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductClientRandom(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_product_client_random`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReport(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_report`;
    return this.httpClient.get<Report>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  getCommentProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_comment_product/${id}`;
    return this.httpClient.get<Comment_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReplyCommentProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_reply_comment_product/${id}`;
    return this.httpClient.get<ReplyComment>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getQuestionProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_question_product/${id}`;
    return this.httpClient.get<Question_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReplyQuestionProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_reply_question_product/${id}`;
    return this.httpClient.get<ReplyQuestion>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReplyQuestionClientId(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_reply_question/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReplyCommentClientId(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_reply_comment/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReplyQuestion(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_reply_question`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReplyComment(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_reply_comment`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getStatusReplyCommentClientId(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_status_reply_comment/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  changeReplyStatus(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_status_reply_question_comment/${id}`;
    return this.httpClient.put(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getStatusReplyQuestionClientId(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_status_reply_question/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getQuestion(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_question`;
    return this.httpClient.get<Question_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getComment(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_comment`;
    return this.httpClient.get<Comment_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putQuestion(id:number, status:boolean, data:Question_): Observable<any>
  {
    data.status = status;
    
    const url = `${this.REST_API_SERVER}/put_question_status/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putComment(id:number, status:boolean, data:Comment_): Observable<any>
  {
    data.status = status;
    
    const url = `${this.REST_API_SERVER}/put_comment_status/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postClient(data:any): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_client`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postView(data:any): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_view`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putClient(id:string, data:any): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_client/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putClientPass(data:any): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_client_pass`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  clientPostReoprt(data:any): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_report_client`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getFooter(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_footer_client`;
    return this.httpClient.get<Footer>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_product/${id}`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCategoryId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_category_product/${id}`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSexProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_sex_product/${id}`;
    return this.httpClient.get<SexProduct>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  checkOrder(id:string): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_order_client_check/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postOrder(client_id:string, data: ListOrder): Observable<any>
  {
    data.client_id = client_id;
    data.status = 'Đang tạo';
    
    const url = `${this.REST_API_SERVER}/post_order`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postOderCart(data: Cart): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_order_cart`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putOderCart(data: Cart): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_order_cart`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColorProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_color_product/${id}`;
    return this.httpClient.get<ColorProduct>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSizeProductId(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_size_product/${id}`;
    return this.httpClient.get<SizeProduct>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  checkOrderCart(data:Cart): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_check_order_cart`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  checkOrderCartHeader(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_check_order_cart_header/${id}`;
    return this.httpClient.get<Cart>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getOrderCart(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_order_cart/${id}`;
    return this.httpClient.get<ListOrder>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getOrder(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_order_client/${id}`;
    return this.httpClient.get<ListOrder>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCartItem(id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_cart_item/${id}`;
    return this.httpClient.get<Cart>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putNumberCartItem(data:Cart): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_number_cart_item`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteCartItem(id: number)
  {
    
    const url = `${this.REST_API_SERVER}/delete_cart_item/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  putOrder(data:ListOrder): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_order_pay`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putBonusCodeId(id:number, amount:number): Observable<any>
  {
    
    let data=<any>{};
    data.amount = amount;
    const url = `${this.REST_API_SERVER}/put_amount_event/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getOrderDetail(order_id:number): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_order_detail/${order_id}`;
    return this.httpClient.get<ListOrder>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putCancelOrder(data:ListOrder): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_cancel_order`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  homeGetProductHot(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/home_get_product_hot`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  homeGetProductPriceUp(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/home_get_product_price_up`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  homeGetProductPriceDown(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/home_get_product_price_down`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  homeGetProductBigDiscount(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/home_get_product_big_discount`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  getProductAmount(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product_amount`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getQuestionClientId(client_id:string): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_question_client_id/${client_id}`;
    return this.httpClient.get<Question_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCommentClientId(client_id:string): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_comment_client_id/${client_id}`;
    return this.httpClient.get<Comment_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postQuestion(data:Question_): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_question`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postComment(data:Comment_): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_comment`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postReplyQuestion(data:ReplyQuestion): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_reply_question`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  checkCommentProductId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_check_comment_product/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putCheckCommentProductId(data:any): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/put_check_comment_product`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postReplyComment(data:ReplyComment): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/post_reply_comment`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteQuestion(id: number)
  {
    
    const url = `${this.REST_API_SERVER}/delete_question/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteComment(id: number)
  {
    
    const url = `${this.REST_API_SERVER}/delete_comment/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  // DashboardService

  putCancelOrderD(data:ListOrder): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_cancel_order`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getFooterD(): Observable<any>
  {
    
    const url = `${this.REST_API_SERVER}/get_footer_client`;
    return this.httpClient.get<Footer>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getOrderId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_order_admin/${id}`;
    return this.httpClient.get<ListOrder>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCart(order_id: number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_cart/${order_id}`;
    return this.httpClient.get<Cart>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  datePipe: DatePipe = new DatePipe('en-US');
  date = new Date();
  transformDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

  setStatusOrder(order_id:number, status:string): Observable<any>
  {
    let day: string = this.transformDate!;

    var data: ListOrder = <ListOrder>{};
    data.status = status;
    if(status == 'Đang giao')
    {
      data.updated_at = day;
    }
    if(status == 'Đã nhận')
    {
      data.received_date = day;
    }
    
    const url = `${this.REST_API_SERVER}/put_status_order/${order_id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putPrepay(order_id:number, prepay:number, orderTotalPrice:number): Observable<any>
  {
    var data = <any>{};
    data.id	 = order_id;
    data.order_prepay	 = prepay;
    data.order_total_price_old = orderTotalPrice;
    
    const url = `${this.REST_API_SERVER}/put_prepay_order`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductTotalById(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product/${id}`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  setProductTotalById(id:number, numb:number, total:number, status:string): Observable<any>
  {
    var data: Product = <Product>{};
    if(status == "cong")
    {
      data.amount = Number(total)+Number(numb);
    }
    else
    {
      data.amount = Number(total)-Number(numb);
    }
    const url = `${this.REST_API_SERVER}/put_amount_product/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putCheckComment(product_id:number, client_id:string): Observable<any>
  {
    var data: any = <any>{};
    data.product_id = product_id;
    data.client_id = client_id;

    const url = `${this.REST_API_SERVER}/put_check_comment`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postCheckComment(product_id:number, client_id:string): Observable<any>
  {
    var data: any = <any>{};
    data.product_id = product_id;
    data.client_id = client_id;

    const url = `${this.REST_API_SERVER}/post_check_comment`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getFooterId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_footer/${id}`;
    return this.httpClient.get<Footer>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCategoryLimitD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_category_limit`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putFooterD(id:number, data:Footer): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_footer/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getEventId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_event/${id}`;
    return this.httpClient.get<Event_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postEvent(data:Event_): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_event`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putEvent(id:number, data:Event_): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_event/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteEvent(id: number)
  {
    const url = `${this.REST_API_SERVER}/delete_event/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSexD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_sex`;
    return this.httpClient.get<Sex>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColorD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_color`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSizeD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_size`;
    return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductLimit(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product_limit`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReportLimit(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_report_limit`;
    return this.httpClient.get<Report>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getEventD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_event`;
    return this.httpClient.get<Event_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getView(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_view`;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getClient(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_client`;
    return this.httpClient.get<Client>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getOrderD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_order_admin`;
    return this.httpClient.get<ListOrder>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getOrderSuccess(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_order_success`;
    return this.httpClient.get<ListOrder>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProduct(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCommentD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_comment`;
    return this.httpClient.get<Comment_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getQuestionD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_question`;
    return this.httpClient.get<Question_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReportD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_report`;
    return this.httpClient.get<Report>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCategoryD(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_category`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCategoryIdD(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_category/${id}`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postCategory(data:Category): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_category`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putCategory(id:number, data:Category): Observable<any>
  {
    console.log("id: ", id);
    console.log("data: ", data);
    const url = `${this.REST_API_SERVER}/put_category/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteCategory(id: number)
  {
    const url = `${this.REST_API_SERVER}/delete_category/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  // HeaderService
  getCommentH(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_comment_new`;
    return this.httpClient.get<Comment_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getQuestionH(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_question_new`;
    return this.httpClient.get<Question_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getReportH(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_report_new`;
    return this.httpClient.get<Report>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putCommentH(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_comment_new/${id}`;
    return this.httpClient.put(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putQuestionH(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_question_new/${id}`;
    return this.httpClient.put(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putReport(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_report_new`;
    return this.httpClient.put(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  // ProductService

  getCategoryP(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_category_add_product`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSexP(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_sex_add_product`;
    return this.httpClient.get<Sex>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColorP(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_color_add_product`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSizeP(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_size_add_product`;
    return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSexProduct(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_sex_product`;
    return this.httpClient.get<SexProduct>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColorProduct(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_color_product`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSelectSexId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_sex_product/${id}`;
    return this.httpClient.get<Sex>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSelectSizeId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_size_product/${id}`;
    return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSelectColorId(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_color_product/${id}`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSizeProduct(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_size_product`;
    return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getEventP(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_event`;
    return this.httpClient.get<Event_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getProductP(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getProductIdP(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product/${id}`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postProduct(data:Product): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_product`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postSexProduct(id:number, data:Sex): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_sex_product/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postColorProduct(id:number, data:Color): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_color_product/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  postSizeProduct(id:number, data:Size): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/post_size_product/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putProduct(data:Product, id:number): Observable<any>
  {
    data.id = id;
    const url = `${this.REST_API_SERVER}/put_product/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteProduct(id: number)
  {
    const url = `${this.REST_API_SERVER}/delete_product/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  deleteSsc(id: number)
  {
    const url = `${this.REST_API_SERVER}/delete_ssc_product/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  // SidebarService

  getAdminIdS(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_admin/${id}`;
    return this.httpClient.get<Admin>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  putAdminId(id:number, data:Admin): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/put_admin/${id}`;
    return this.httpClient.put(url, data, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getCategoryS(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_category`;
    return this.httpClient.get<Category>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSexS(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_sex`;
    return this.httpClient.get<Sex>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getColorS(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_color`;
    return this.httpClient.get<Color>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getSizeS(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_size`;
    return this.httpClient.get<Size>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getEventS(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_event`;
    return this.httpClient.get<Event_>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }
  
  getProductS(): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_product`;
    return this.httpClient.get<Product>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  getFooterIdS(id:number): Observable<any>
  {
    const url = `${this.REST_API_SERVER}/get_footer/${id}`;
    return this.httpClient.get<Footer>(url, httpOptions).pipe(catchError(this.handleError<any>('')));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
