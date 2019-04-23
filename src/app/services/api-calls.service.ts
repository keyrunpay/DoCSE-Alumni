import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  baseUrl: string = environment.apiUrl;

  options = {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("kutoken")
    })
  };
  constructor(
    private http: HttpClient
  ) { }

  private doReq(url: string, item: any, method: string, sameError: boolean = false) {
    let cError = catchError(err => {
      if (err.status == 0) return throwError({ error: "System assumed lack of connection" });
      else if (err.error) {
        if (sameError == true) return throwError(err.error);
        let errDesc: string = '';
        if (typeof (err.error) == 'object') {
          Object.keys(err.error).forEach(element => {
            errDesc += err.error[element].toString() + ', ';
          });
          errDesc = errDesc.slice(0, errDesc.length - 2).replace(/\./g, '');
          return throwError({ error: errDesc });
        } else {
          return throwError({ error: "Unusual error occured" });
        }
      }
      else return throwError({ error: "Unusual error occured" });
    });

    switch (method.toUpperCase()) {
      case 'POST':
        return this.http.post(url, item, this.options).pipe(cError);
      case 'GET':
        return this.http.get(url, this.options).pipe(cError);
      case 'PUT':
        return this.http.put(url, item, this.options).pipe(cError);
      case 'DELETE':
        return this.http.delete(url, this.options).pipe(cError);
    }
  }

  getSkills() {
    return this.doReq(this.baseUrl + "skills", null, "get", true);
  }

  addSkills(item: any) {
    return this.doReq(this.baseUrl + "skills", item, "post");
  }

  removeSkills(id: string) {
    return this.doReq(this.baseUrl + "skills/" + id, null, "delete", true);
  }

  getSkillsRecommend(data: string) {
    return this.doReq(this.baseUrl + "skills/match/" + data, null, "get", true);
  }


  uploadFile(data) {
    return this.doReq(this.baseUrl + "upload", data, 'post');
  }

  createPost(item: any) {
    return this.doReq(this.baseUrl + "posts", item, 'post');
  }

  doLogin(email: string, pass: string) {
    let item = {
      email: email,
      password: pass
    };
    return this.doReq(this.baseUrl + "login", item, 'post', true);
  }

  doRegister(item: any) {
    return this.doReq(this.baseUrl + "register", item, 'post', true);
  }

  doGetPosts() {
    return this.doReq(this.baseUrl + "posts", null, 'get');
  }

  doGetMyPost() {
    return this.doReq(this.baseUrl + "posts/mine", null, 'get', true);
  }

  doGetProfile() {
    return this.doReq(this.baseUrl + "profile/details", null, 'get', true);
  }

  doUpdateProfile(item: any) {
    return this.doReq(this.baseUrl + "profile/details", item, 'put', true);
  }

  getExperiences() {
    return this.doReq(this.baseUrl + "experiences", null, "get", true);
  }

  searchOrganization(query: string) {
    return this.doReq(this.baseUrl + "organizations/match/" + query, null, "get", true);
  }

  addExperience(item: any) {
    return this.doReq(this.baseUrl + "experiences", item, "post", true);
  }

  updateExp(item: any, id: number) {
    return this.doReq(this.baseUrl + "experiences/" + id, item, "put", true);
  }

  delExp(id: number) {
    return this.doReq(this.baseUrl + "experiences/" + id, null, "delete", true);
  }
}
