import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { FormGroup, Validators, FormBuilder, FormControl }  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Size } from '../models/Size';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-size',
  templateUrl: './list-size.component.html',
  styleUrls: ['./list-size.component.css']
})
export class ListSizeComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public listSize: Size[] = [];
  public size: Size[] = [];

  public listSize_copy = this.listSize;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  public acEdit = false;
  
  editSizeForm = new FormGroup({
    name : new FormControl(''),
    created_at : new FormControl(''),
    status : new FormControl(''),
  });

  addSizeForm = new FormGroup({
    name : new FormControl(''),
    created_at : new FormControl(''),
    status : new FormControl(''),
  });

  ngOnInit(): void {
    this.getSize();

    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.select_value = value.trim().toLowerCase();
      this.listSize = this.listSize_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listSize = this.listSize_copy.filter(data => data.id.toString().toLowerCase().includes(this.find_text));
    })
  }

  addSize()
  {
    if(this.addSizeForm.value.name == null || this.addSizeForm.value.name == '')
    {
      this.sweetError("Tên không được để trống");
    }
    else
    {
      var date = new Date();
      var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.addSizeForm.value.created_at = transformDate;
      if(!this.addSizeForm.value.status)
        this.addSizeForm.value.status = 0;
      
      this.serverHttp.postSize(this.addSizeForm.value).subscribe((data) => {
        if(data)
        {
          this.getSize();
          this.sweetSuccess("Thêm thành công");
          this.addSizeForm.reset();
        }
      })
    }
  }

  editSize()
  {
    if(!this.editSizeForm.value.name)
    {
      this.sweetError("Tên không được để trống");
    }
    else
    {
      this.serverHttp.putSize(this.size[0].id, this.editSizeForm.value).subscribe((data) => {
        if(data)
        {
          this.getSize();
          this.sweetSuccess("Cập nhật thành công");
          this.editSizeForm.reset();
          this.setAcEdit(false);
        }
      })
    }
  }

  setAcEdit(status:boolean)
  {
    this.acEdit = status;
    if(!status)
      this.editSizeForm.reset();
  }

  getSize()
  {
    this.serverHttp.getSize().subscribe((data) => {
      if(data)
      {
        this.listSize = data;
        this.listSize_copy = this.listSize;
        this.select_value_filter_control.next(this.select_value);
      }
    })
  }

  changeSelectStatus(select_value:string){
    this.select_value = select_value;
    this.select_value_filter_control.next(this.select_value);
  }

  deleteConfirmed(id:number)
  {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSize(id);
      }
    })
  }

  deleteSize(id:number)
  {
    this.serverHttp.deleteSize(id).subscribe((data) => {
      if(data)
      {
        this.getSize();
        this.sweetSuccess("Xóa thành công");
      }
    })
  }

  getSizeId(id:number)
  {
    this.serverHttp.getSizeId(id).subscribe((data) => {
      if(data)
      {
        this.size = data;
        console.log(this.size[0]);

        this.editSizeForm.patchValue({
          name: this.size[0].name,
          created_at: this.size[0].created_at,
          status: this.size[0].status,
        });

        this.setAcEdit(true);
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
