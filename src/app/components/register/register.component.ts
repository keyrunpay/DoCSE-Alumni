import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name:string;
  password:string;
  gender:string='Male';
  email:string;
  type:string='Alumni';
  err:any;

  viewP:boolean =false;

  constructor(
    private api:ApiCallsService,
    private toast:SweetalertService
  ) { }

  ngOnInit() {
    document.title='Register - KU Alumni';
  }
  changeViewP(){
    this.viewP=!this.viewP;
  }

  doReg(){
    let submitData={
      name: this.name,
      password: this.password,
      email: this.email,
      type: this.type,
      gender: this.gender
    }

    this.api.doRegister(submitData).subscribe(res=>{
      if (res['email']){
        let email=res['email'];
        this.name='';
        this.email='';
        this.password='';
        if(res['message']) this.toast.toast("success", res['message']);
        else this.toast.toast("success", 'Email address ' + email + ' registered successfully ');
      }

    },err=>{
      if(err.error) {
        this.toast.toast("error", err.error);
      }else{
        this.err=err;
      }
    });
  }

}
