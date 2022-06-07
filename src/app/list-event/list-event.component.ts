import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormGroup, FormControl }  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Event_ } from '../models/Event_';
import { Router } from '@angular/router';
import { EncDecString } from '../models/EncDecString';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}
  
  public currentDate = new Date();

  datePipe: DatePipe = new DatePipe('en-US');

  public listEvent: Event_[] = [];
  public event: Event_[] = [];

  public listEvent_copy = this.listEvent;

  public select_value_filter_control = new Subject<string>();
  public select_value = '';

  public find_text_filter_control = new Subject<string>();
  public find_text = '';

  public totalLength: any;
  public page: number = 1;

  public acEdit = false;
  
  editEventForm = new FormGroup({
    title : new FormControl(''),
    bonus_code : new FormControl(''),
    bonuses: new FormControl(''),
    amount: new FormControl(''),
    created_at : new FormControl(''),
    updated_at : new FormControl(''),
    status : new FormControl(''),
  });

  addEventForm = new FormGroup({
    title : new FormControl(''),
    bonus_code : new FormControl(''),
    bonuses: new FormControl(''),
    amount: new FormControl(''),
    created_at : new FormControl(''),
    updated_at : new FormControl(''),
    status : new FormControl(''),
  });

  ngOnInit(): void {

    this.getEvent();

    this.select_value_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.select_value = value.trim().toLowerCase();
      this.listEvent = this.listEvent_copy.filter(data => data.status.toString().toLowerCase().includes(this.select_value));
    })

    this.find_text_filter_control.pipe(
      debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.find_text = value.trim().toLowerCase();
      this.listEvent = this.listEvent_copy.filter(data => data.bonus_code.toString().toLowerCase().includes(this.find_text));
    })
  }

  formatCash(str:string)
  {
    return  str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }

  formatDay(day:NgbDateStruct)
  {
    if(day)
      return  (day.year + "-" + day.month + "-" + day.day);
    else
      return '';
  }

  maHoa = new EncDecString;
  addEvent()
  {
    if(this.addEventForm.value.bonus_code == null || this.addEventForm.value.bonus_code == '')
    {
      this.sweetError("Mã thưởng không được để trống");
    }
    else
    {
      if(this.addEventForm.value.title == null || this.addEventForm.value.title == '')
      {
        this.sweetError("Tiêu đề không được để trống");
      }
      else
      {
        if(this.addEventForm.value.bonuses == null || this.addEventForm.value.bonuses == '')
        {
          this.sweetError("Tiền thưởng không được để trống");
        }
        else
        {
          this.addEventForm.value.created_at = this.formatDay(this.addEventForm.value.created_at);
          this.addEventForm.value.updated_at = this.formatDay(this.addEventForm.value.updated_at);
            
          if(!this.addEventForm.value.status)
            this.addEventForm.value.status = 0;
          
          this.addEventForm.value.bonus_code = this.maHoa.Encrypt(this.addEventForm.value.bonus_code);
          this.serverHttp.postEvent(this.addEventForm.value).subscribe((data) => {
            console.log(data);
            this.getEvent();
            this.sweetSuccess("Thêm thành công");
            this.addEventForm.reset();
          })
        }
      }
    }
  }

  editEvent()
  {
    if(this.editEventForm.value.created_at == '' || this.editEventForm.value.created_at == null)
    {
      this.editEventForm.value.created_at = this.event[0].created_at;
    }
    else
    {
      var day = this.formatDay(this.editEventForm.value.created_at);
      this.editEventForm.value.created_at = day;
    }

    if(this.editEventForm.value.updated_at == '' || this.editEventForm.value.updated_at == null)
    {
      this.editEventForm.value.updated_at = this.event[0].updated_at;
    }
    else
    {
      var day = this.formatDay(this.editEventForm.value.updated_at);
      this.editEventForm.value.updated_at = day;
    }

    console.log(this.editEventForm.value);


    if(this.editEventForm.value.bonus_code == null || this.editEventForm.value.bonus_code == '')
    {
      this.sweetError("Mã thưởng không được để trống");
    }
    else
    {
      if(this.editEventForm.value.title == null || this.editEventForm.value.title == '')
      {
        this.sweetError("Tiêu đề không được để trống");
      }
      else
      {
        if(this.editEventForm.value.bonuses == null || this.editEventForm.value.bonuses == '')
        {
          this.sweetError("Tiền thưởng không được để trống");
        }
        else
        { 
          console.log(this.editEventForm.value);
          this.editEventForm.value.bonus_code = this.maHoa.Encrypt(this.editEventForm.value.bonus_code);
          this.serverHttp.putEvent(this.event[0].id, this.editEventForm.value).subscribe((data) => {
            console.log(data);
            this.getEvent();
            this.sweetSuccess("Cập nhật thành công");
            this.editEventForm.reset();
            this.setAcEdit(false);
          })
        }
      }
    }
    
  }

  setAcEdit(status:boolean)
  {
    this.acEdit = status;
    if(!status)
    {
      this.editEventForm.reset();
    }
  }

  getEvent()
  {
    this.serverHttp.getEvent().subscribe((data) => {
      this.listEvent = data;
      this.listEvent_copy = this.listEvent;
      this.select_value_filter_control.next(this.select_value);
      this.listEvent.forEach(element => {
        element.bonus_code = this.maHoa.Decrypt(element.bonus_code);
      });
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
        this.deleteEvent(id);
      }
    })
  }

  deleteEvent(id:number)
  {
    this.serverHttp.deleteEvent(id).subscribe((data) => {
      console.log(data);
      this.getEvent();
      this.sweetSuccess("Xóa thành công");
    })
  }

  getEventId(id:number)
  {
    this.serverHttp.getEventId(id).subscribe((data) => {
      console.log(data);
      this.event = data;
      console.log(this.event[0]);

      this.editEventForm.patchValue({
        title: this.event[0].title,
        bonus_code: this.maHoa.Decrypt(this.event[0].bonus_code),
        bonuses: this.event[0].bonuses,
        amount: this.event[0].amount,
        status: this.event[0].status,
      });

      console.log(this.editEventForm.value);

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
