import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: any;
  httpOptions: any;
  constructor(private http:HttpClient) {

    this.api = 'https://api.github.com/';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

   }

   getAll() {
     return this.http.get( this.api  + 'users', this.httpOptions);
   }

   getUsersPerPage(perPage:any, lastIndex) {
     return this.http.get( this.api + 'users?per_page=' + perPage + '&since='+ lastIndex , this.httpOptions);
   }

   search(keyword:any,perPage:any,pageNumber:any) {
     return this.http.get( this.api +  'search/users?q=' + keyword  + '&per_page=' + perPage + '&page=' + pageNumber);
   }

   getUserDetail(username:any) {
     return this.http.get( this.api + 'users/' + username , this.httpOptions );
   }
  
   getUserRepos(username:any,perPage:any, pageNumber:any) {
     return this.http.get( this.api +'users/' + username + '/repos?per_page='+ perPage +'&page=' + pageNumber);

   }
}
