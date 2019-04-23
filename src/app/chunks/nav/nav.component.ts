import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private route:Router,
    private toast:SweetalertService
  ) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('kutoken');
    this.route.navigate(["login"]);
    this.toast.toast("success","Logged out successfully");
  }

}
