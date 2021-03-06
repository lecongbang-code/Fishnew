import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sex } from '../models/Sex';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-sex',
  templateUrl: './list-sex.component.html',
  styleUrls: ['./list-sex.component.css']
})
export class ListSexComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ) { }

  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public listSex: Sex[] = [];
  public sex: Sex[] = [];

  public listSex_copy = this.listSex;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  public acEdit = false;
  
  editSexForm = new FormGroup({
    name: new FormControl(''),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
    status: new FormControl(''),
  });

  addSexForm = new FormGroup({
    name: new FormControl(''),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
    status: new FormControl(''),
  });
  
  ngOnInit(): void {
    this.getSex();

    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.select_value = value.trim().toLowerCase();
      this.listSex = this.listSex_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listSex = this.listSex_copy.filter(data => data.id.toString().toLowerCase().includes(this.find_text));
    })
  }

  getSex()
  {
    this.serverHttp.getSex().subscribe((data) => {
      if(data)
      {
        this.listSex = data;
        this.listSex_copy = this.listSex;
        this.select_value_filter_control.next(this.select_value);
      }
    })
  }

  addSex()
  {
    if(this.addSexForm.value.name == null || this.addSexForm.value.name == '')
    {
      this.sweetError("T??n kh??ng ???????c ????? tr???ng");
    }
    else
    {
        var date = new Date();
        var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        this.addSexForm.value.created_at = transformDate;
        if(!this.addSexForm.value.status)
          this.addSexForm.value.status = 0;
        this.serverHttp.postSex(this.addSexForm.value).subscribe((data) => {
          if(data)
          {
            this.getSex();
            this.sweetSuccess("Th??m th??nh c??ng");
            this.addSexForm.reset();
          }
        })
    }
  }

  editSex()
  {
    if(!this.editSexForm.value.name)
    {
      this.sweetError("T??n kh??ng ???????c ????? tr???ng");
    }
    else
    {
      this.serverHttp.putSex(this.sex[0].id, this.editSexForm.value).subscribe((data) => {
        if(data)
        {
          this.getSex();
          this.sweetSuccess("C???p nh???t th??nh c??ng");
          this.editSexForm.reset();
          this.setAcEdit(false);
        }
      })
    }
  }

  setAcEdit(status:boolean)
  {
    this.acEdit = status;
    if(!status)
      this.editSexForm.reset();
  }

  changeSelectStatus(select_value:string){
    this.select_value = select_value;
    this.select_value_filter_control.next(this.select_value);
  }

  deleteConfirmed(id:number)
  {
    Swal.fire({
      title: 'B???n c?? mu???n x??a?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'C??',
      cancelButtonText: 'Kh??ng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSex(id);
      }
    })
  }

  deleteSex(id:number)
  {
    this.serverHttp.deleteSex(id).subscribe((data) => {
      if(data)
      {
        this.getSex();
        this.sweetSuccess("X??a th??nh c??ng");
      }
    })
  }

  getSexId(id:number)
  {
    this.serverHttp.getSexId(id).subscribe((data) => {
      if(data)
      {
        this.sex = data;
        console.log(this.sex[0]);

        this.editSexForm.patchValue({
          name: this.sex[0].name,
          created_at: this.sex[0].created_at,
          updated_at: this.sex[0].updated_at,
          status: this.sex[0].status,
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
