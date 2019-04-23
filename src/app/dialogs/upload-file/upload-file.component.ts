import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';



@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  showLoader: boolean = true;
  constructor(
    private api: ApiCallsService,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast:SweetalertService
  ) { }


  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.uploadFile();
  }


  uploadFile() {
    let event: any = this.data;
    this.showLoader = true;
    let selectedFile: File = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('photo', selectedFile, selectedFile.name);
    this.api.uploadFile(uploadData).subscribe(res => {
      if (res['url']) {
        this.dialogRef.close({
          success: res['url']
        });
      }
    }, err => {
      if(err.error){
        this.toast.toast("error", err.error);
      }
      this.dialogRef.close();
    })
  }

  close() {
    this.dialogRef.close();
  }
}
