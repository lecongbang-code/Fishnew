
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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

  constructor(
    public serverHttp: ServiceService,
    private location: Location,
    private router: ActivatedRoute,
    private routerL: Router,
  ){}

  editProductForm = new FormGroup({
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
    new_price: new FormControl(''),
    amount: new FormControl(''),
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

  currentDate = new Date();
  datePipe: DatePipe = new DatePipe('en-US');
  
  productId = <Product>{};
  listCategory: Category[] = [];

  listSex:Sex[] = [];
  selectedItemsSex:Sex[] = [];
  sexDropdownSettings:IDropdownSettings[] = [];

  listColor:Color[] = [];
  selectedItemsColor:Color[] = [];
  colorDropdownSettings:IDropdownSettings[] = [];

  listSize:Size[] = [];
  selectedItemsSize:Size[] = [];
  sizeDropdownSettings:IDropdownSettings[] = [];
  
  product_id = 0;
  created_at = '';

  ngOnInit(): void {
    this.product_id = this.router.snapshot.params['id'];
    this.getProductId(this.product_id);
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
        this.getSelectSex(this.product_id);
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

  getSelectSex(id:number)
  {
    this.serverHttp.getSelectSexId(id).subscribe((data) => {
      if(data)
      {
        this.selectedItemsSex = data;
        this.editProductForm.patchValue({
          sex: this.selectedItemsSex,
        });
        this.getSelectSize(this.product_id);
      }
    })
  }

  getSelectSize(id:number)
  {
    this.serverHttp.getSelectSizeId(id).subscribe((data) => {
      if(data)
      {
        this.selectedItemsSize = data;
        this.editProductForm.patchValue({
          size: this.selectedItemsSize,
        });
        this.getSelectColor(this.product_id);
      }
    })
  }

  getSelectColor(id:number)
  {
    this.serverHttp.getSelectColorId(id).subscribe((data) => {
      if(data)
      {
        this.selectedItemsColor = data;
        this.editProductForm.patchValue({
          color: this.selectedItemsColor,
        });
      }
    })
  }

  getProductId(id:number)
  {
    this.serverHttp.getProductIdP(id).subscribe((data) => {
      if(data)
      {
        this.productId = data;
        console.log("data: ", data);
        this.created_at = this.productId.created_at;
        

        this.editProductForm.patchValue({
          category_id: this.productId.category_id,
          image_path_1: this.productId.image_path_1,
          image_path_2: this.productId.image_path_2,
          image_path_3: this.productId.image_path_3,
          image_path_4: this.productId.image_path_4,
          video_path: this.productId.video_path,
          name: this.productId.name,
          description: this.productId.description,
          discount: this.productId.discount,
          old_price: this.productId.old_price,
          new_price: this.productId.new_price,
          amount: this.productId.amount,
          question_status: this.productId.question_status,
          comment_status: this.productId.comment_status,
          all_sizes_status: this.productId.all_sizes_status,
          banner_status: this.productId.banner_status,
          created_at: this.productId.created_at,
          status: this.productId.status,
        });

        this.getCategory();
      }
    })
  }

  new_price = '0';
  update_new_price()
  {
    if(this.editProductForm.value.old_price > 0 && this.editProductForm.value.old_price <= 1000000000)
    {
      if(this.editProductForm.value.discount > 0 && this.editProductForm.value.discount <= 100)
      {
        var a = this.editProductForm.value.old_price - (this.editProductForm.value.old_price*this.editProductForm.value.discount)/100
        this.new_price = this.formatCash(a.toString());
        this.editProductForm.value.new_price = a;
      }
      else
      {
        var b = this.editProductForm.value.old_price;
        this.new_price = this.formatCash(b.toString());
        this.editProductForm.value.new_price = b;
      }
    }
    else
    {
      this.new_price = "0";
      this.editProductForm.value.new_price = 0;
    }
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }

  editProduct()
  {
    if(this.editProductForm.value.name == null || this.editProductForm.value.name == '')
    {
      this.sweetError("Tên không được để trống");
    }
    else if(this.editProductForm.value.image_path_1 == null || this.editProductForm.value.image_path_1 == '')
    {
      this.sweetError("Ảnh 1 không được để trống");
    }
    else if(this.editProductForm.value.category_id == null || this.editProductForm.value.category_id == '')
    {
      this.sweetError("Thể loại không được để trống");
    }
    else if(this.editProductForm.value.description == null || this.editProductForm.value.description == '')
    {
      this.sweetError("Mô tả không được để trống");
    }
    else if(this.editProductForm.value.old_price == null || this.editProductForm.value.old_price == '')
    {
      this.sweetError("Giá không được để trống");
    }
    else if(this.editProductForm.value.amount == null || this.editProductForm.value.amount == '')
    {
      this.sweetError("Số lượng không được để trống");
    }
    else if(this.editProductForm.value.amount < 1 && this.editProductForm.value.amount > 9999)
    {
      this.sweetError("Số lượng không hợp lệ (1-9999)");
    }
    else if(this.editProductForm.value.old_price < 999 && this.editProductForm.value.amount > 1000000000)
    {
      this.sweetError("Giá không hợp lệ (1000-1000000000)");
    }
    else if(this.editProductForm.value.discount < 0 && this.editProductForm.value.amount > 99)
    {
      this.sweetError("Giảm giá không hợp lệ (0-99)");
    }
    else if(this.editProductForm.value.sex.length < 1)
    {
      this.sweetError("Cá thể không được để trống");
    }
    else if(this.editProductForm.value.size.length < 1)
    {
      this.sweetError("Kích thước không được để trống");
    }
    else if(this.editProductForm.value.color.length < 1)
    {
      this.sweetError("Màu sắc không được để trống");
    }
    else
    {
      var date = new Date();
      var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.editProductForm.value.created_at = transformDate;
      if(!this.editProductForm.value.question_status)
        this.editProductForm.value.question_status = 0;
      if(!this.editProductForm.value.comment_status)
        this.editProductForm.value.comment_status = 0;
      if(!this.editProductForm.value.all_sizes_status)
        this.editProductForm.value.all_sizes_status = 0;
      if(!this.editProductForm.value.banner_status)
        this.editProductForm.value.banner_status = 0;
      if(!this.editProductForm.value.status)
        this.editProductForm.value.status = 0;

      this.serverHttp.putProduct(this.editProductForm.value, this.product_id).subscribe((data) => {
        if(data){
          this.serverHttp.deleteSsc(this.product_id).subscribe((dt) => {
            if(dt)
            {
              for (let i = 0; i < this.editProductForm.value.sex.length; i++) {
                const element = this.editProductForm.value.sex[i];
                this.serverHttp.postSexProduct(this.product_id, element).subscribe((dataPro) => {
                  if(i == this.editProductForm.value.sex.length-1 && dataPro)
                  {
                    for (let i = 0; i < this.editProductForm.value.size.length; i++) {
                      const element = this.editProductForm.value.size[i];
                      this.serverHttp.postSizeProduct(this.product_id, element).subscribe((dataSize) => {
                        if(i == this.editProductForm.value.size.length-1 && dataSize)
                        {
                          for (let i = 0; i < this.editProductForm.value.color.length; i++) {
                            const element = this.editProductForm.value.color[i];
                            this.serverHttp.postColorProduct(this.product_id, element).subscribe((dataColor) => {
                              if(i == this.editProductForm.value.color.length-1 && dataColor)
                              {
                                this.goForward();
                                this.sweetSuccess("Cập nhật thành công");
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
          })
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
    this.routerL.navigate(['/admin/list-product']);
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