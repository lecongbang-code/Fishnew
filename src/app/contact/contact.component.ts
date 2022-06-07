import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor( ) { 
    this.siteKey = JSON.parse(localStorage.getItem('footer')!).captchaElemKey;
  }

  siteKey: string;

  createTextForm = new FormGroup({
    text: new FormControl(''),
    numberStart: new FormControl(''),
    numberEnd: new FormControl(''),
    space: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  config: AngularEditorConfig = {
    height: 'auto',
    minHeight: '100px',
    maxHeight: '300px',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    showToolbar: false,
  };
  
  testValue='';
  testValue1='';

  content='';
  contentCopy='';

  maxV = 99999;
  minV = -99999;

  submitCreateText(value:any)
  {
    this.content = '';
    this.contentCopy = '';
    
    if(value.numberStart < this.minV || value.numberStart > this.maxV || value.numberEnd < this.minV || value.numberEnd > this.maxV) 
    {
      this.sweetError('Giới hạn số từ' + this.minV + ' đến: ' + this.maxV);
    }
    else
    {
      if(value.numberStart <= value.numberEnd)
      {
        for (let i = value.numberStart; i <= value.numberEnd; i++) {
          var content = i + value.space + value.text + '\n';
          this.content += content  + '<br>';
          this.contentCopy += content;
        }
      }
      else
      {
        for (let i = value.numberStart; i >= value.numberEnd; i--) {
          var content = i + value.space + value.text + '\n';
          this.content +=  content  + '<br>';
          this.contentCopy += content;
        }
      }
    }
  }

  changeTestValue()
  {
    if(this.createTextForm.value.space==null)this.createTextForm.value.space='';
    this.testValue = this.createTextForm.value.numberStart + this.createTextForm.value.space + this.createTextForm.value.text;
    this.testValue1 = this.createTextForm.value.numberEnd + this.createTextForm.value.space + this.createTextForm.value.text;
  }

  resetcreateTextForm()
  {
    this.createTextForm.reset();
    this.createTextForm.patchValue({
      text: '',
      numberStart: '',
      numberEnd: '',
    });

    this.testValue = '';
    this.testValue1 = '';
    this.content = '';
    this.contentCopy = '';
  }

  ngOnInit(): void {

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
