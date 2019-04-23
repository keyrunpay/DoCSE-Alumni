import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ApiCallsService } from '../../services/api-calls.service';

@Component({
  selector: 'app-update-profile-details',
  templateUrl: './update-profile-details.component.html',
  styleUrls: ['./update-profile-details.component.scss']
})
export class UpdateProfileDetailsComponent implements OnInit {
  showLoading:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiCallsService,
  ) {}

  doUpdate(){
    this.showLoading=true;
    this.api.doUpdateProfile(this.data).subscribe(res=>{
      console.log(res);
      this.doClose();
    },err=>{
      console.log(err);
      this.doClose();
    });
  }

  doClose(){
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
