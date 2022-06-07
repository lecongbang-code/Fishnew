import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormGroup, FormControl }  from '@angular/forms';
import Swal from 'sweetalert2';
import { EncDecString } from '../models/EncDecString';
import { Meta, Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private meta: Meta,
    public serverHttp: ServiceService,private cookieService: CookieService,
  ) { }

  editClientForm = new FormGroup({
    id : new FormControl(''),
    name : new FormControl(''),
    phone : new FormControl(''),
    email: new FormControl(''),
    address : new FormControl('')
  });

  editClientPassForm = new FormGroup({
    id : new FormControl(''),
    password : new FormControl(''),
    new_password : new FormControl(''),
    r_password: new FormControl('')
  });

  maHoa = new EncDecString;

  client:any;

  public setTitle(newTitle: string) 
  {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    
    this.setTitle("Thông tin hồ sơ của bạn");

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      this.getClient();
    }
    else
    {
      this.router.navigate(['/login']);
    }
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

  acChangePass = false;
  showChangePass(sta:boolean)
  {
    this.acChangePass = sta;
    this.editClientPassForm.reset();
  }

  getClient()
  {
    this.editClientForm.patchValue({
      id: this.client.facebook_id,
      name: this.maHoa.Decrypt(this.client.name),
      phone: this.maHoa.Decrypt(this.client.phone),
      email: this.maHoa.Decrypt(this.client.email),
      address: this.maHoa.Decrypt(this.client.address),
    });
  }
  
  submitEditClientPass()
  {
    this.editClientPassForm.patchValue({
      id: this.client.facebook_id,
    });

    if(this.editClientPassForm.value.password.length < 6)
    {
      this.sweetWarning("Mật khẩu phải ít nhất có 6 ký tự");
    }
    else if(this.editClientPassForm.value.new_password.length < 6)
    {
      this.sweetWarning("Mật khẩu phải ít nhất có 6 ký tự");
    }
    else if(this.editClientPassForm.value.r_password.length < 6)
    {
      this.sweetWarning("Mật khẩu phải ít nhất có 6 ký tự");
    }
    else if(this.editClientPassForm.value.r_password != this.editClientPassForm.value.new_password)
    {
      this.sweetWarning("Mật khẩu không trùng khớp");
    }
    else
    {
      this.serverHttp.putClientPass(this.editClientPassForm.value).subscribe((data) => {
        console.log(data);
        if(data)
        {
          this.sweetSuccess("Cập nhật thành công");
          this.editClientPassForm.reset();
        }
        else
        {
          this.sweetError("Mật khẩu không chính xác");
        }
      })
    }
  }

  submitEditClient()
  {
    this.editClientForm.patchValue({
      name: this.maHoa.Encrypt(this.editClientForm.value.name),
      phone: this.maHoa.Encrypt(this.editClientForm.value.phone),
      email: this.maHoa.Encrypt(this.editClientForm.value.email),
      address: this.maHoa.Encrypt(this.editClientForm.value.address),
    });

    this.putClient();
  }

  putClient()
  {
    this.serverHttp.putClient(this.client.facebook_id, this.editClientForm.value).subscribe((data) => {
      if(data)
      {
        this.cookieService.set( 'client', JSON.stringify(data), 0.0625);
        this.client = JSON.parse(this.cookieService.get('client')!);
        this.getClient();
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

}
