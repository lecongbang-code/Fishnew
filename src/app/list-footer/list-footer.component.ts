import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl }  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Footer } from '../models/Footer';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-list-footer',
  templateUrl: './list-footer.component.html',
  styleUrls: ['./list-footer.component.css']
})
export class ListFooterComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}
  
  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public footer = <Footer>{};

  public acEdit = false;
  
  editFooterForm = new FormGroup({
    name_shop: new FormControl(''),
    logo: new FormControl(''),
    description: new FormControl(''),
    name_ecommerce_1: new FormControl(''),
    url_ecommerce_1: new FormControl(''),
    name_ecommerce_2: new FormControl(''),
    url_ecommerce_2: new FormControl(''),
    name_ecommerce_3: new FormControl(''),
    url_ecommerce_3: new FormControl(''),
    phone_1: new FormControl(''),
    phone_2: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
 
    this.getFooterId(1);
  }

  editFooter()
  {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.editFooterForm.value.updated_at = transformDate;
    this.serverHttp.putFooter(this.footer.id, this.editFooterForm.value).subscribe((data) => {
      if(data)
      {
        this.getFooterId(1);
        this.sweetSuccess("Cập nhật thành công");
        this.setAcEdit(false);
      }
      else
      {
        this.sweetError("Cập nhật thất bại!");
      }
    })
  }

  setAcEdit(status:boolean)
  {
    this.acEdit = status;
  }

  getFooterId(id:number)
  {
    this.serverHttp.getFooterId(id).subscribe((data) => {
      if(data)
      {
        this.footer = data;
        this.editFooterForm.patchValue({
          name_shop: this.footer.name_shop,
          logo: this.footer.logo,
          description: this.footer.description,
          name_ecommerce_1: this.footer.name_ecommerce_1,
          url_ecommerce_1: this.footer.url_ecommerce_1,
          name_ecommerce_2: this.footer.name_ecommerce_2,
          url_ecommerce_2: this.footer.url_ecommerce_2,
          name_ecommerce_3: this.footer.name_ecommerce_3,
          url_ecommerce_3: this.footer.url_ecommerce_3,
          phone_1: this.footer.phone_1,
          phone_2: this.footer.phone_2,
          email: this.footer.email,
          address: this.footer.address,
          created_at: this.footer.created_at,
          updated_at: this.footer.updated_at,
          status: this.footer.status,
        });
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
}
