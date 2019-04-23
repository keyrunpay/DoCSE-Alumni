import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiCallsService } from '../../services/api-calls.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss']
})

export class AddSkillDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: any=[];
  recomSkills: any;
  isLoading: boolean = false;
  skillSet: Array<string> = ['Javascript', 'PHP', 'Angular', 'Flutter', 'Dart', 'C++', 'C', 'Node.JS', 'Python'];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && value.length > 0) {
      this.addSkills(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  addSkills(name: string) {
    let item = {
      name: name
    }
    this.api.addSkills(item).subscribe(res => {
      this.skills.push({ name: res['name'], id: res['id'] });
    }, err => {
      console.log(err);
      if(err.error) this.toast.toast("error",err.error);
    });
  }

  remove(cnt, item): void {
    this.api.removeSkills(item.id).subscribe(res => {
      this.skills.splice(cnt, 1);
    }, err => {
      console.log(err);
    })
  }

  constructor(
    public dialogRef: MatDialogRef<AddSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiCallsService,
    private toast: SweetalertService
  ) { }

  ngOnInit() {
    this.skills= this.data;
  }

  getRecommend(item) {
    let query: string = item.target.value;
    this.isLoading = true;
    if (query.length <= 0) {
      this.recomSkills = null;
      this.isLoading = false;
      return;
    }
    this.api.getSkillsRecommend(query).subscribe(res => {
      this.recomSkills = res;
      console.log(res);
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    });
  }
}
