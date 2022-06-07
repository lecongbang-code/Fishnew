import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '../models/Report';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {

  constructor(
    public serverHttp: ServiceService,
    private router: Router,
  ){}

  listReport:Report[]=[];
  
  public totalLength: any;
  public page: number = 1;

  ngOnInit(): void {
    this.getReport();
  }

  getReport()
  {
    this.serverHttp.getReport().subscribe((data) => {
      if(data)
      {
        this.listReport = data;
      }
    })
  }
}
