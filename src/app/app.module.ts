import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './chunks/post/post.component';
import { PostItemComponent } from './chunks/post-item/post-item.component';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { UploadFileComponent } from './dialogs/upload-file/upload-file.component';
import { NavComponent } from './chunks/nav/nav.component';
import { UpdateProfileDetailsComponent } from './dialogs/update-profile-details/update-profile-details.component';
import { AddSkillDialogComponent } from './dialogs/add-skill-dialog/add-skill-dialog.component';
import { AddWorkExperienceDialogComponent } from './dialogs/add-work-experience-dialog/add-work-experience-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    PostComponent,
    PostItemComponent,
    UploadFileComponent,
    NavComponent,
    UpdateProfileDetailsComponent,
    AddSkillDialogComponent,
    AddWorkExperienceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxContentLoadingModule
  ],
  entryComponents:[
    UploadFileComponent,
    UpdateProfileDetailsComponent,
    AddSkillDialogComponent,
    AddWorkExperienceDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
