import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  err:any;

  constructor(
    private route: Router,
    private api: ApiCallsService,
    private toaster: SweetalertService
  ) {}

  ngOnInit() {
    document.title='Login - KU Alumni';
    if(localStorage.getItem('kutoken')!=null){
      this.route.navigate(['home']);
    }
  }

  sendLoginInfo(){
    this.err=null;
    this.api.doLogin(this.username, this.password).subscribe(res=>{
      console.log(res);
      if (res['error']){
        this.toaster.toast("error", res['message']);
      } else {
        this.toaster.toast("success", res['message']);
        localStorage.setItem('kutoken', res['token']);
        this.api.options = {
          headers: new HttpHeaders({
            "Authorization": "Bearer " + res['token']
          })
        };
        this.route.navigate(['home']);
      }
    },err=>{
      console.log(err);
      if(err.error){
        if(err.error.message) this.toaster.toast("error", err.error.message);
        else this.err=err.error;
      }
    });
  }

  gotoRegister(){
    this.route.navigate(['register']);
  }
}
