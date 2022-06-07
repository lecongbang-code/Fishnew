import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormGroup, FormControl }  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public listCategory: Category[] = [];
  public category: Category[] = [];

  public listCategory_copy = this.listCategory;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  public acEdit = false;
  
  editCategoryForm = new FormGroup({
    name : new FormControl(''),
    image_path : new FormControl(''),
    created_at : new FormControl(''),
    status : new FormControl(''),
  });

  addCategoryForm = new FormGroup({
    name : new FormControl(''),
    image_path : new FormControl(''),
    created_at : new FormControl(''),
    status : new FormControl(''),
  });


  ngOnInit(): void {
    this.getCategory();
    
    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.select_value = value.trim().toLowerCase();
      this.listCategory = this.listCategory_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listCategory = this.listCategory_copy.filter(data => data.id.toString().toLowerCase().includes(this.find_text));
    })
  }

  addCategory()
  {
    if(this.addCategoryForm.value.name == null || this.addCategoryForm.value.name == '')
    {
      this.sweetError("Tên không được để trống");
    }
    else
    {
      if(this.addCategoryForm.value.image_path == null || this.addCategoryForm.value.image_path == '')
      {
        this.sweetError("Ảnh không được để trống");
      }
      else
      {
        var date = new Date();
        var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        this.addCategoryForm.value.created_at = transformDate;
        if(!this.addCategoryForm.value.status)
          this.addCategoryForm.value.status = 0;
        
        this.serverHttp.postCategory(this.addCategoryForm.value).subscribe((data) => {
          if(data)
          {
            this.getCategory();
            this.sweetSuccess("Thêm thành công");
            this.addCategoryForm.reset();
          }
        })
      }
    }
  }

  editCategory()
  {
    if(!this.editCategoryForm.value.name)
    {
      this.sweetError("Tên không được để trống");
    }
    else
    {
      if(!this.editCategoryForm.value.image_path)
      {
        this.sweetError("Ảnh không được để trống");
      }
      else
      {
        this.serverHttp.putCategory(this.category[0].id, this.editCategoryForm.value).subscribe((data) => {
          if(data)
          {
            this.getCategory();
            this.sweetSuccess("Cập nhật thành công");
            this.editCategoryForm.reset();
            this.setAcEdit(false);
          }
        })
      }
    }
  }

  setAcEdit(status:boolean)
  {
    this.acEdit = status;
    if(!status)
      this.editCategoryForm.reset();
  }

  getCategory()
  {
    this.serverHttp.getCategory().subscribe((data) => {
      if(data)
      {
        this.listCategory = data;
        this.listCategory_copy = this.listCategory;
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
        this.deleteCategory(id);
      }
    })
  }

  deleteCategory(id:number)
  {
    this.serverHttp.deleteCategory(id).subscribe((data) => {
      if(data)
      {
        this.getCategory();
        this.sweetSuccess("Xóa thành công");
      }
    })
  }

  getCategoryId(id:number)
  {
    this.serverHttp.getCategoryId(id).subscribe((data) => {
      if(data)
      {
        this.category = data;
        console.log(this.category[0]);
      }

      this.editCategoryForm.patchValue({
        name: this.category[0].name,
        image_path: this.category[0].image_path,
        created_at: this.category[0].created_at,
        status: this.category[0].status,
      });

      this.setAcEdit(true);
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
