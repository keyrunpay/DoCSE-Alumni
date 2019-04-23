import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items:any;
  homeData:any;

  constructor(
    private api: ApiCallsService,
    private toast: SweetalertService
  ) { }

  ngOnInit() {
    document.title = 'KU Alumni';
    this.getPosts();

  }

  getPosts(){
    this.api.doGetPosts().subscribe(res=>{
      this.items=res;
      console.log(res);
    },err=>{
      console.log(err);
    });
  }
}
