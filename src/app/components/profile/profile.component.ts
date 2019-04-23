import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';
import { UpdateProfileDetailsComponent } from '../../dialogs/update-profile-details/update-profile-details.component';
import { MatDialog } from '@angular/material';
import { AddSkillDialogComponent } from '../../dialogs/add-skill-dialog/add-skill-dialog.component';
import { AddWorkExperienceDialogComponent } from '../../dialogs/add-work-experience-dialog/add-work-experience-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData:any;
  posts:any;
  skills: any;
  workList:any;
  // workList:any=[
  //   { name:'Kathmandu Univeristy 1', year:'2017 - 2021', post: 'Student', img:'assets/images/work.png' },
  //   { name:'Kathmandu Univeristy 2', year:'2017 - 2021', post: 'Student', img:'assets/images/work.png' },
  //   { name:'Kathmandu Univeristy 3', year:'2017 - 2021', post: 'Student', img:'assets/images/work.png' },
  //   { name:'Kathmandu Univeristy 4', year:'2017 - 2021', post: 'Student', img:'assets/images/work.png' },
  // ]

  constructor(
    private api: ApiCallsService,
    private toast: SweetalertService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.getProfileData();
    this.getProfile();
    this.getSkills();
    this.getExperience();
  }

  getProfile(){
    this.api.doGetProfile().subscribe(res=>{
      console.log(res);
      this.profileData=res;
    },err=>{
      console.log(err);
    })
  }

  getSkills() {
    this.api.getSkills().subscribe(res => {
      this.skills = res;
    }, err => {
      console.log(err);
    });
  }



  getProfileData(){
    this.api.doGetMyPost().subscribe(res=>{
      console.log(res);
      this.posts=res;
    },err=>{
      console.log(err);
      this.toast.toast("error","Something unusual occured");
    })
  }

  openProfileUpdateDialog() {
    const dialogConfig = {
      width: "auto",
      height: "auto",
      data: this.profileData
    };

    let dialogRef = this.dialog.open(UpdateProfileDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value=>{
      if(value){
        console.log(value);
      }
    });
  }

  addSkillsDialog() {
    const dialogConfig = {
      width: "auto",
      height: "auto",
      data: this.skills
    };

    let dialogRef = this.dialog.open(AddSkillDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value=>{
      if(value){
        console.log(value);
      }
    });
  }

  workExpEditDialog() {
    const dialogConfig = {
      width: "auto",
      height: "auto",
      data: this.workList
    };

    let dialogRef = this.dialog.open(AddWorkExperienceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value=>{
      if(value){
        console.log(value);
      }
    });
  }

  getExperience(){
    this.api.getExperiences().subscribe(res=>{
      this.workList=res;
      console.log(res);
    }, err=>{
      console.log(err);
    })
  }


}
