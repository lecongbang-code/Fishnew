import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';
import { NewClient } from '../models/Client';
import { FormControl, FormGroup } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { EncDecString } from '../models/EncDecString';
import { CookieService } from 'ngx-cookie-service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  constructor( 
    private cookieService: CookieService,
    private location: Location, 
    private meta: Meta,
    private titleService: Title,
    public serverHttp: ServiceService ) { 
      this.siteKey = JSON.parse(localStorage.getItem('footer')!).captchaElemKey;
    }

  siteKey: string;
  register = 1;
  client = <NewClient>{};
  maHoa = new EncDecString;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  forgotForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  cookieExists: boolean = false;

  ngOnInit() 
  {
    this.cookieExists = this.cookieService.check('client');
    if(this.cookieExists)
    {
      this.sweetWarning("Bạn đã đăng nhập");
      this.goBack();
    }
    this.updateMetaProduct();
    this.setTitle("Fish new - Đăng nhập");
  }

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  updateMetaProduct()
  {
    var title = 'Fish new - Cửa hàng cá betta';
    var type = 'website';
    var url = 'https://fishnew.tk/login';
    var site_name = 'Fish new';
    var description = 'Fish new - của hàng cá cảnh chuyên cung cấp sỉ và lẻ các loại cá betta và guppy với mức giá vừa rẻ lại vừa đẹp vừa túi tiền người chơi sản phẩm chất lượng. Giao hàng toàn quốc miễn phí vận chuyển cho đơn hàng trên 149.000VNĐ hỗ trợ hết mình vì khách hàng. Đổi trả nếu sản phẩm không đúng ảnh hoặc không đúng kích thước';
    var image = 'https://fishnew.tk/assets/img/Logo-Fishnew200x200.png';
    var imgWidth = '200';
    var imgHeight = '200';

    this.meta.updateTag({property:'og:title', content:title});
    this.meta.updateTag({property:'og:type', content:type});
    this.meta.updateTag({property:'og:url', content:url});
    this.meta.updateTag({property:'og:site_name', content:site_name});
    this.meta.updateTag({property:'og:description', content:description});
    this.meta.updateTag({property:'og:image', content:image});
    this.meta.updateTag({property:'og:imgWidth', content:imgWidth});
    this.meta.updateTag({property:'og:imgHeight', content:imgHeight});
  }

  submitForgot(value:any)
  {
    this.serverHttp.getClientId(value.username).subscribe((data) => {
      if(data.facebook_id != null && data.facebook_id != '')
      {
        var email = this.maHoa.Decrypt(data.email);
        if(email == value.email)
        {
          this.serverHttp.putForgot(value).subscribe((dataPut) => {
            console.log(dataPut);
            if(dataPut)
            {
              this.sweetSuccessOk("Mật khẩu đã được gửi đến email của bạn");
            }
            else
            {
              this.sweetError("Có lỗi trong thao tác vui lòng thử lại");
            }
            this.captchaElem.resetCaptcha();
          });
        }
        else
        {
          this.sweetError("Email này chưa liên kết với tài khoản của bạn");
        }
      }
      else
      {
        this.sweetError("Tài khoản không tồn tại");
      }
    })
  }

  submitLogin(value:any)
  {
    if(value.username.length < 6)
    {
      this.sweetWarning("Tài khoản hoặc mật khẩu sai");
    }
    else if(value.password.length < 6)
    {
      this.sweetWarning("Tài khoản hoặc mật khẩu sai");
    }
    else
    {
      this.serverHttp.clientLogin(value).subscribe((data) => {
        if(data.facebook_id != null && data.facebook_id != '')
        {
          data.password = '******';
          this.cookieService.set( 'client', JSON.stringify(data), 0.1);
          this.sweetSuccess("Đăng nhập thành công");
          this.loginForm.reset();
          this.goBack();
        }
        else
        {
          this.sweetWarning("Tài khoản hoặc mật khẩu sai");
        }
      })
      this.captchaElem.resetCaptcha();
    }
  }

  submitRegister(value:any)
  {
    value.username = value.username.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s+/g, '').toLowerCase();
    
    if(value.name.length < 6)
    {
      this.sweetWarning("Tên phải ít nhất có 6 ký tự");
    }
    else if(value.username.length < 6)
    {
      this.sweetWarning("Tài khoản phải ít nhất có 6 ký tự");
    }
    else if(value.password.length < 6)
    {
      this.sweetWarning("Mật khẩu phải ít nhất có 6 ký tự");
    }
    else if(value.confirm_password != value.password)
    {
      this.sweetWarning("Mật khẩu không trùng khớp");
    }
    else
    {
      this.checkClient(value);
      this.captchaElem.resetCaptcha();
    }
  }

  checkClient(client:any)
  {
    this.serverHttp.getClientId(client.username).subscribe((data) => {
      if(data.facebook_id != null && data.facebook_id != '')
      {
        this.sweetWarning("Tài khoản đã tồn tại");
      }
      else
      {
        this.updateUser(client);
      }
    })
  }

  updateUser(client:any)
  {
    var randNumber = Math.floor(Math.random() * 6);
    client.avatar = '../../assets/img/'+(randNumber+1)+'.png';
    client.name = this.maHoa.Encrypt(client.name);
    this.serverHttp.postClient(client).subscribe((data) => {
      if(data)
      {
        data.password = '******';
        this.cookieService.set( 'client', JSON.stringify(data), 0.1);
        this.sweetSuccess("Đăng nhập thành công");
        this.registerForm.reset();
        this.goBack();
      }
      else
      {
        console.log("Đăng ký thất bại");
      }
    })
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

  changelogin(n:number)
  {
    this.showPass = false;
    this.showTextPass='password';

    this.register = n;

    if(this.register == 1)
    {
      this.setTitle("Fish new - Đăng nhập");
    }
    else if(this.register == 2)
    {
      this.setTitle("Fish new - Đăng ký");
    }
    else
    {
      this.setTitle("Fish new - Quên mật khẩu");
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

  sweetSuccessOk(title:string)
  {
    Swal.fire({
      title: title,
      width: 600,
      padding: '3em',
      color: '#716add',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
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

  public goBack()
  {
    this.location.back();
  }
}