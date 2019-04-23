import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-add-work-experience-dialog',
  templateUrl: './add-work-experience-dialog.component.html',
  styleUrls: ['./add-work-experience-dialog.component.scss']
})
export class AddWorkExperienceDialogComponent implements OnInit {
  workList: any;
  addMode: boolean = false;
  organization_name: string;
  position: string;
  years: string;
  workSet: any;
  isSearching = false;

  updateIndex:number=-1;
  updateId:number=0;
  updateMode:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<AddWorkExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiCallsService,
    private toast: SweetalertService
  ) { }

  ngOnInit() {
    this.workList = this.data;
  }

  toggleUpdate(cnt:number){
    this.updateMode=!this.updateMode;
    if(this.updateMode){
      this.updateIndex=cnt;
      this.updateId=this.workList[cnt].id;
      this.organization_name=this.workList[cnt].organization_name;
      this.position=this.workList[cnt].position;
      this.years=this.workList[cnt].years;
    }else{
      this.organization_name="";
      this.position="";
      this.years="";
    }
  }

  getWorks() {
    if (this.organization_name.length < 1) {
      this.workSet = null;
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    this.api.searchOrganization(this.organization_name).subscribe(res => {
      this.workSet = res;
      this.isSearching = false;
      console.log(res);
    }, err => {
      this.isSearching = false;
      console.log(err);
    })
  }

  addModeToggle() {
    this.addMode = !this.addMode;
  }
  addToTop(name: string) {
    this.organization_name = name;
    this.workSet = null;
    this.isSearching = false;
  }
  addExp() {
    let item = {
      organization_name: this.organization_name,
      position: this.position,
      years: this.years
    }

    this.api.addExperience(item).subscribe(res => {
      this.workList.push(res);
      console.log(res);
      this.dialogRef.close();
    }, err => {
      console.log(err);
    });
  }

  updateExp(){
    let item={
      position: this.position,
      years: this.years
    }
    this.api.updateExp(item, this.updateId).subscribe(res=>{
      this.workList[this.updateIndex].position=this.position;
      this.workList[this.updateIndex].years=this.years;
      this.dialogRef.close();
    }, err=>{
      console.log(err);
    })
  }

  delExp(){
    this.api.delExp(this.updateId).subscribe(res=>{
      this.workList.splice(this.updateIndex,1);
      this.dialogRef.close();
    },err=>{
      console.log(err);
    })
  }
}
