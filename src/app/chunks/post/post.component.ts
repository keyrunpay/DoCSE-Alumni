import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() datas:any;
  isProcessing:boolean=false;
  pictures:Array<string>=[];

  constructor(
    private toaster:SweetalertService,
    private api:ApiCallsService
  ) { }
  ngOnInit() {
    if(this.datas.pictures) this.pictures=this.datas.pictures.split(',');
  }
}
