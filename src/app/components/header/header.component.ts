import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Comment_ } from 'src/app/models/Comment_';
import { Question_ } from 'src/app/models/Question_';
import { Report } from 'src/app/models/Report';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public serverHttp: ServiceService, private cookieService: CookieService, private router: Router) { }

  lengthComments = 0;
  comments: Comment_[] = [];

  lengthQuestion = 0;
  questions: Question_[] = [];

  lengthReport = 0;
  reports: Report[] = [];

  allLength = 0;

  client:any;
  ngOnInit(): void {
    this.client = JSON.parse(this.cookieService.get('client')!);
    if(this.client == null)
    {
      this.router.navigate(['/admin-login']);
    }
    else if (this.client.status == 0)
    {
      this.router.navigate(['/admin-login']);
    }
    else
    {
      this.getComment();
    }
  }

  getComment()
  {
    this.serverHttp.getCommentH().subscribe((data) => {
      this.comments = data;
      this.lengthComments = data.length;
      this.getQuestion();
    })
  }

  getQuestion()
  {
    this.serverHttp.getQuestionH().subscribe((data) => {
      this.questions = data;
      this.lengthQuestion = data.length;
      this.getReport();
    })
  }

  getReport()
  {
    this.serverHttp.getReportH().subscribe((data) => {
      this.reports = data;
      this.lengthReport = data.length;
      this.allLength = this.lengthComments + this.lengthQuestion + this.lengthReport;
    })
  }

  putComment()
  {
    for (let i = 0; i < this.comments.length; i++) {
      const e = this.comments[i];
      this.serverHttp.putCommentH(e.id).subscribe((data) => {
        console.log(data);
        if(i == this.comments.length - 1)
        {
          this.getComment();
        }
      })
    }
  }

  putQuestion()
  {
    for (let i = 0; i < this.questions.length; i++) {
      const e = this.questions[i];
      this.serverHttp.putQuestionH(e.id).subscribe((data) => {
        console.log(data);
        if(i == this.questions.length - 1)
        {
          this.getComment();
        }
      })
    }
  }

  putReport()
  {
    this.serverHttp.putReport().subscribe((data) => {
      this.getComment();
    })
  }
  
}
