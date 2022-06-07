import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EncDecString } from '../models/EncDecString';
import { Question_, ReplyQuestion } from '../models/Question_';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  listQuestion:Question_[]=[];
  replyQuestions:ReplyQuestion[]=[];
  
  public totalLength: any;
  public page: number = 1;

  maHoa = new EncDecString;
  ngOnInit(): void {

    this.getQuestion();
  }

  getQuestion()
  {
    this.serverHttp.getQuestion().subscribe((data) => {
      if(data)
      {
        this.listQuestion = data;
        this.listQuestion.forEach(element => {
          element.client_name = this.maHoa.Decrypt(element.client_name);
        });
        this.getReplyQuestion();
      }
    })
  }

  changeNameProduct(item:Question_)
  {
    item.product_name = this.removeAccents(item.product_name);
    this.router.navigate(['/product-detail', item.product_name, item.product_id]);
  }

  removeAccents(str:string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '-').toLowerCase();
  }

  getReplyQuestion()
  {
    this.serverHttp.getReplyQuestion().subscribe((data) => {
      if(data)
      {
        this.replyQuestions = data;
      }
    })
  }

  update_status(id:number, status:boolean, data:Question_)
  {
    this.serverHttp.putQuestion(id,status, data).subscribe((data) => {
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
