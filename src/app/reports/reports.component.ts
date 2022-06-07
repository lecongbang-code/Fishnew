import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ReCaptcha2Component } from 'ngx-captcha';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { EncDecString } from '../models/EncDecString';
import { Footer } from '../models/Footer';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  siteKey: string;

  constructor(
    public serverHttp: ServiceService,
    private cookieService: CookieService,
    private titleService: Title,
    private meta: Meta,
  ) {
      this.siteKey = JSON.parse(localStorage.getItem('footer')!).captchaElemKey;
    }
  
  client:any;
  maHoa = new EncDecString;
  footer: any;

  ngOnInit(): void {
    this.setTitle("Phản hồi cho chúng tôi");
    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      if(this.client != null)
      {
        this.client.name = this.maHoa.Decrypt(this.client.name);
        this.getClient();
      }
    }

    this.footer = JSON.parse(localStorage.getItem('footer')!);
  }

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  postReportForm = new FormGroup({
    client_id: new FormControl(''),
    client_name: new FormControl(''),
    content: new FormControl(''),
    created_at: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  getClient()
  {
    this.postReportForm.patchValue({
      client_id: this.client.facebook_id,
      client_name: this.client.name,
    });
  }

  datePipe: DatePipe = new DatePipe('en-US');
  
  submitReport()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.postReportForm.value.created_at = transformDate;

    if(!this.postReportForm.value.client_id)
    {
      this.postReportForm.value.client_id = '0';
    }

    this.serverHttp.clientPostReoprt(this.postReportForm.value).subscribe((data) => {
      if(data)
      {
        this.postReportForm.reset();
        this.sweetSuccess("Cảm ơn bạn đã góp ý kiến cho chúng tôi!");
      }
      this.captchaElem.resetCaptcha();
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