import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { FormGroup, FormControl }  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Color } from '../models/Color';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-color',
  templateUrl: './list-color.component.html',
  styleUrls: ['./list-color.component.css']
})
export class ListColorComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}
  
  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public listColor: Color[] = [];
  public color: Color[] = [];

  public listColor_copy = this.listColor;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  public acEdit = false;
  
  public color1 = '';
  public color2 = '';
  
  editColorForm = new FormGroup({
    name : new FormControl(''),
    color_code : new FormControl(''),
    created_at : new FormControl(''),
    status : new FormControl(''),
  });

  addColorForm = new FormGroup({
    name : new FormControl(''),
    color_code : new FormControl(''),
    created_at : new FormControl(''),
    status : new FormControl(''),
  });

  ngOnInit(): void {

    this.getColor();

    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.select_value = value.trim().toLowerCase();
      this.listColor = this.listColor_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listColor = this.listColor_copy.filter(data => data.id.toString().toLowerCase().includes(this.find_text));
    })
  }

  addColor()
  {
    this.addColorForm.value.color_code = this.color1;
    if(this.addColorForm.value.name == null || this.addColorForm.value.name == '')
    {
      this.sweetError("Tên không được để trống");
    }
    else
    {
      if(this.addColorForm.value.color_code == null || this.addColorForm.value.color_code == '')
      {
        this.sweetError("Mãu màu không được để trống");
      }
      else
      {
        var date = new Date();
        var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        this.addColorForm.value.created_at = transformDate;
        if(!this.addColorForm.value.status)
          this.addColorForm.value.status = 0;
        
        this.serverHttp.postColor(this.addColorForm.value).subscribe((data) => {
          if(data)
          {
              this.getColor();
              this.sweetSuccess("Thêm thành công");
              this.addColorForm.reset();
              this.color1 = '';
          }
        })
      }
    }
  }

  editColor()
  {
    this.editColorForm.value.color_code = this.color2;

    if(!this.editColorForm.value.name)
    {
      this.sweetError("Tên không được để trống");
    }
    else
    {
      this.serverHttp.putColor(this.color[0].id, this.editColorForm.value).subscribe((data) => {
        if(data)
        {
          this.getColor();
          this.sweetSuccess("Cập nhật thành công");
          this.editColorForm.reset();
          this.setAcEdit(false);
          this.color2 = '';
        }
      })
    }
  }

  setAcEdit(status:boolean)
  {
    this.acEdit = status;
    if(!status)
    {
      this.editColorForm.reset();
      this.color2 = '';
    }
  }

  getColor()
  {
    this.serverHttp.getColor().subscribe((data) => {
      if(data)
      {
        this.listColor = data;
        this.listColor_copy = this.listColor;
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
        this.deleteColor(id);
      }
    })
  }

  deleteColor(id:number)
  {
    this.serverHttp.deleteColor(id).subscribe((data) => {
      if(data)
      {
        this.getColor();
        this.sweetSuccess("Xóa thành công");
      }
    })
  }

  getColorId(id:number)
  {
    this.serverHttp.getColorId(id).subscribe((data) => {
      if(data)
      {
        this.color = data;
        console.log(this.color[0]);

        this.editColorForm.patchValue({
          name: this.color[0].name,
          color_code: this.color[0].color_code,
          created_at: this.color[0].created_at,
          status: this.color[0].status,
        });

        this.color2 = this.color[0].color_code;

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
