import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ServiceService } from '../services/service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ad-login',
  templateUrl: './ad-login.component.html',
  styleUrls: ['./ad-login.component.css']
})
export class AdLoginComponent implements OnInit {


  siteKey: string;

  constructor(
    private cookieService: CookieService,
    public serverHttp: ServiceService,
    private router: Router,
  ) { 
    this.siteKey = JSON.parse(localStorage.getItem('footer')!).captchaElemKey;
  }

  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  date = new Date().getTime();

  ngOnInit(): void {

  }

  loginSubmit()
  {
    this.serverHttp.login(this.loginForm.value).subscribe((data) => {
      if(data.id != null && data.id != '' && data.username != null && data.username != '' && data.password != null && data.password != '')
      {
        console.log(data);
        data.password = '******';
        this.cookieService.set('client', JSON.stringify(data), 0.1);
        this.sweetSuccess("Đăng nhập thành công");
        this.router.navigate(['/admin']);
        this.loginForm.reset();
      }
    })
    this.captchaElem.resetCaptcha();
  }

  showTextPass='password';
  showPass=false;
  changeShowPass()
  {
    this.showPass = !this.showPass;
    if(this.showPass)
    {
      this.showTextPass = 'text';
    }
    else
    {
      this.showTextPass = 'password';
    }
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
