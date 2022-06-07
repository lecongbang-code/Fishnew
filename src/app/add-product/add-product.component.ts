import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Sex } from '../models/Sex';
import { Size } from '../models/Size';
import { Color } from '../models/Color';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '8rem',
    maxHeight: '20rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  
  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');
  
  public listProduct: Product[] = [];
  public product: Product[] = [];
  public listCategory: Category[] = [];

  constructor(
    public serverHttp: ServiceService,
    private location: Location,
    private router: Router
  ){}

  addProductForm = new FormGroup({
    category_id: new FormControl(''),
    image_path_1: new FormControl(''),
    image_path_2: new FormControl(''),
    image_path_3: new FormControl(''),
    image_path_4: new FormControl(''),
    video_path: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    discount: new FormControl(''),
    old_price: new FormControl(''),
    new_price: new FormControl('0'),
    amount: new FormControl('1'),
    amount_total: new FormControl(''),
    sex: new FormControl(''),
    size: new FormControl(''),
    color: new FormControl(''),
    question_status: new FormControl(''),
    comment_status: new FormControl(''),
    all_sizes_status: new FormControl(''),
    banner_status: new FormControl(''),
    created_at: new FormControl(''),
    status: new FormControl(''),
  });

  listSex:Sex[] = [];
  sexDropdownSettings:IDropdownSettings[] = [];

  listColor:Color[] = [];
  colorDropdownSettings:IDropdownSettings[] = [];

  listSize:Size[] = [];
  sizeDropdownSettings:IDropdownSettings[] = [];
  
  ngOnInit(): void {
    this.getCategory();
  }

  multiselectSex()
  {
    this.serverHttp.getSexP().subscribe((data) => {
      if(data)
      {
        this.listSex = data;
        this.multiselectSize();
      }
    })

    this.sexDropdownSettings[0] = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Hủy chọn',
      searchPlaceholderText: 'Tìm',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  multiselectColor()
  {
    this.serverHttp.getColorP().subscribe((data) => {
      if(data)
      {
        this.listColor = data;
      }
    })

    this.colorDropdownSettings[0] = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Hủy chọn',
      searchPlaceholderText: 'Tìm',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  multiselectSize()
  {
    this.serverHttp.getSizeP().subscribe((data) => {
      if(data)
      {
        this.listSize = data;
        this.multiselectColor();
      }
    })

    this.sizeDropdownSettings[0] = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Hủy chọn',
      searchPlaceholderText: 'Tìm',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  getCategory()
  {
    this.serverHttp.getCategoryP().subscribe((data) => {
      if(data)
      {
        this.listCategory = data;
        this.multiselectSex();
      }
    })
  }

  new_price = '0';
  update_new_price()
  {
    if(this.addProductForm.value.old_price > 0 && this.addProductForm.value.old_price <= 1000000000)
    {
      if(this.addProductForm.value.discount > 0 && this.addProductForm.value.discount <= 100)
      {
        var a = this.addProductForm.value.old_price - (this.addProductForm.value.old_price*this.addProductForm.value.discount)/100
        this.new_price = this.formatCash(a.toString());
        this.addProductForm.value.new_price = a;
      }
      else
      {
        var b = this.addProductForm.value.old_price;
        this.new_price = this.formatCash(b.toString());
        this.addProductForm.value.new_price = b;
      }
    }
    else
    {
      this.new_price = "0";
      this.addProductForm.value.new_price = 0;
    }
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }

  addProduct()
  {
    console.log(this.addProductForm.value);

    this.update_new_price();

    if(this.addProductForm.value.name == null || this.addProductForm.value.name == '')
    {
      this.sweetError("Tên không được để trống");
    }
    else if(this.addProductForm.value.image_path_1 == null || this.addProductForm.value.image_path_1 == '')
    {
      this.sweetError("Ảnh 1 không được để trống");
    }
    else if(this.addProductForm.value.category_id == null || this.addProductForm.value.category_id == '')
    {
      this.sweetError("Thể loại không được để trống");
    }
    else if(this.addProductForm.value.description == null || this.addProductForm.value.description == '')
    {
      this.sweetError("Mô tả không được để trống");
    }
    else if(this.addProductForm.value.old_price == null || this.addProductForm.value.old_price == '')
    {
      this.sweetError("Giá không được để trống");
    }
    else if(this.addProductForm.value.amount == null || this.addProductForm.value.amount == '')
    {
      this.sweetError("Số lượng không được để trống");
    }
    else if(this.addProductForm.value.amount < 1 && this.addProductForm.value.amount > 9999)
    {
      this.sweetError("Số lượng không hợp lệ (1-9999)");
    }
    else if(this.addProductForm.value.old_price < 999 && this.addProductForm.value.amount > 1000000000)
    {
      this.sweetError("Giá không hợp lệ (1000-1000000000)");
    }
    else if(this.addProductForm.value.discount < 0 && this.addProductForm.value.amount > 99)
    {
      this.sweetError("Giảm giá không hợp lệ (0-99)");
    }
    else if(this.addProductForm.value.sex.length < 1)
    {
      this.sweetError("Cá thể không được để trống");
    }
    else if(this.addProductForm.value.size.length < 1)
    {
      this.sweetError("Kích thước không được để trống");
    }
    else if(this.addProductForm.value.color.length < 1)
    {
      this.sweetError("Màu sắc không được để trống");
    }
    else
    {
      var date = new Date();
      var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.addProductForm.value.created_at = transformDate;
      this.addProductForm.value.amount_total = this.addProductForm.value.amount;
      if(!this.addProductForm.value.question_status)
        this.addProductForm.value.question_status = 0;
      if(!this.addProductForm.value.comment_status)
        this.addProductForm.value.comment_status = 0;
      if(!this.addProductForm.value.all_sizes_status)
        this.addProductForm.value.all_sizes_status = 0;
      if(!this.addProductForm.value.banner_status)
        this.addProductForm.value.banner_status = 0;
      if(!this.addProductForm.value.status)
        this.addProductForm.value.status = 0;

      this.serverHttp.postProduct(this.addProductForm.value).subscribe((data) => {
        if(data)
        {
          for (let i = 0; i < this.addProductForm.value.sex.length; i++) {
            const element = this.addProductForm.value.sex[i];
            this.serverHttp.postSexProduct(data.id, element).subscribe((dataSex) => {
              if(i == this.addProductForm.value.sex.length-1 && dataSex)
              {
                for (let i = 0; i < this.addProductForm.value.size.length; i++) {
                  const element = this.addProductForm.value.size[i];
                  this.serverHttp.postSizeProduct(data.id, element).subscribe((dataSize) => {
                    if(i == this.addProductForm.value.size.length-1 && dataSize)
                    {
                      for (let i = 0; i < this.addProductForm.value.color.length; i++) {
                        const element = this.addProductForm.value.color[i];
                        this.serverHttp.postColorProduct(data.id, element).subscribe((dataColor) => {
                          if(i == this.addProductForm.value.color.length-1 && dataColor)
                          {
                            Swal.fire({
                              title: 'Thêm thành công',
                              showDenyButton: true,
                              showCancelButton: true,
                              confirmButtonText: 'Quay lại danh sách',
                              cancelButtonText: "Tiếp tục",
                              denyButtonText: `Làm sạch và tiếp tục`,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                this.goForward();
                              } else if (result.isDenied) {
                                this.addProductForm.reset();
                              }
                            })
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
        else
        {
          this.sweetError("Thêm thất bại");
        }
      })
    }
  }

  goBack()
  {
    this.location.back();
  }

  goForward()
  {
    this.router.navigate(['/admin/list-product']);
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