import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';
import { MatDialog } from '@angular/material';
import { UploadFileComponent } from '../../dialogs/upload-file/upload-file.component';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  postBody:string;
  pictures:Array<string>=[];
  postConf:string='Normal';
  expiry:number=604800;

  postBodyControl:boolean=false;
  isUploading=false;

  constructor(
    private api: ApiCallsService,
    private toaster: SweetalertService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  uploadImage(){
    this.isUploading=!this.isUploading;
  }
  checkPostConf(){
    if(this.postConf=='Important') return true;
    else return false;
  }

  doPost(){
    let item={
      body: this.postBody,
      pictures: this.pictures.toString(),
      post_type: this.postConf,
      expiry: this.expiry,
      pinned: 0
    }
    this.api.createPost(item).subscribe(res=>{
      if(res['error']) this.toaster.toast("error", res['message']);
      else  this.toaster.toast("success", res['message']);
    },err=>{
      console.log(err);
    });
  }
  postBodyControlSwap(){
    this.postBodyControl=!this.postBodyControl;
    if(this.postBodyControl){
      setTimeout(()=>{
        document.getElementById('postWritingArea').focus();
      },100)
    }
  }

  openFileBrowser() {
    if(this.pictures.length>1) {
      this.toaster.toast("error","Cannot upload more than two images");
      return;
    }
    let btn = document.getElementById('imagePicker');
    btn.click();
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.openUploadDialog(event);
    }
  }

  openUploadDialog(item) {
    const dialogConfig = {
      width: "auto",
      height: "auto",
      data: item
    };

    let dialogRef = this.dialog.open(UploadFileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value=>{
      if(value && value.success){
        this.pictures.push(value.success);
        console.log(this.pictures.toString());
      }
    });
  }

  delImage(index:number){
    this.pictures.splice(index,1);
  }
}
