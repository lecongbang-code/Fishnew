import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Comment_, ReplyComment } from '../models/Comment_';
import { EncDecString } from '../models/EncDecString';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  listComment:Comment_[]=[];
  replyComments:ReplyComment[]=[];
  
  
  public totalLength: any;
  public page: number = 1;

  maHoa = new EncDecString;
  ngOnInit(): void {
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
    this.serverHttp.getComment().subscribe((data) => {
      if(data)
      {
        this.listComment = data;
        this.listComment.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
        });
        this.getReplyComment();
      }
    })
  }

  getReplyComment()
  {
    this.serverHttp.getReplyComment().subscribe((data) => {
      if(data)
      {
        this.replyComments = data;
      }
    })
  }

  update_status(id:number, status:boolean, data:Comment_)
  {
    this.serverHttp.putComment(id,status, data).subscribe((data) => {
      if(data)
      {
        this.sweetSuccess("Cập nhật thành công");
      }
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
}
