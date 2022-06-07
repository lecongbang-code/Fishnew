import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Admin } from '../models/Admin';
import { EncDecString } from '../models/EncDecString';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-ad-information',
  templateUrl: './ad-information.component.html',
  styleUrls: ['./ad-information.component.css']
})
export class AdInformationComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    public serverHttp: ServiceService,
    private router: Router
  ){}

  admin = <Admin>{};

  acEdit = false;

  editAdminForm = new FormGroup({
    name: new FormControl(''),
    avatar: new FormControl(''),
    sex: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
  });

  client:any
  ngOnInit(): void {

    if(this.cookieService.check('client'))
    {
      this.client = JSON.parse(this.cookieService.get('client')!);
      this.getAdmin();
    }
    else
    {
      this.router.navigate(['/admin-login']);
    }
  }

  changeAcEdit(status:boolean)
  {
    this.acEdit = status;
    this.getAdmin();
  }

  formatDay(day:NgbDateStruct)
  {
    if(day)
      return  (day.year + "-" + day.month + "-" + day.day);
    else
      return '';
  }
  
  saveAdmin()
  {
    let id = this.client.id;
    this.editAdminForm.value.name = this.maHoa.Encrypt(this.editAdminForm.value.name);
    this.editAdminForm.value.phone = this.maHoa.Encrypt(this.editAdminForm.value.phone);
    this.editAdminForm.value.email = this.maHoa.Encrypt(this.editAdminForm.value.email);
    this.editAdminForm.value.address = this.maHoa.Encrypt(this.editAdminForm.value.address);
    this.serverHttp.putAdminId(Number(id),this.editAdminForm.value).subscribe((data) => {
      if(data)
      {
        this.sweetSuccess("Cập nhật thành công");
        this.changeAcEdit(false);
      }
      else
      {
        this.sweetError("Cập nhật thất bại");
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
  
  maHoa = new EncDecString;
  getAdmin()
  {
    let id = this.client.id;
    this.serverHttp.getAdminId(Number(id)).subscribe((data) => {
      if(data)
      {
        this.admin = data;
        this.admin.name = this.maHoa.Decrypt(this.admin.name);
        this.admin.phone = this.maHoa.Decrypt(this.admin.phone);
        this.admin.email = this.maHoa.Decrypt(this.admin.email);
        this.admin.address = this.maHoa.Decrypt(this.admin.address);

        this.editAdminForm.patchValue({
          name: this.admin.name,
          avatar: this.admin.avatar,
          sex: this.admin.sex,
          phone: this.admin.phone,
          email: this.admin.email,
          address: this.admin.address,
        });
      }
    })
  }

}
