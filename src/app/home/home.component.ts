import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserService } from '../services/user.service';


import {  Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users:any;
  usersCount: any;
  usersPageCount: any;
  numberOfUserPerPage : any;
  pages: any;
  lastIdSeen: any;
  lastPage: any;
  keyword = new FormControl('');
  isSearch : boolean;
  p: number = 1;
  constructor( private userService: UserService, private router: Router ) { 
    this.pages = [];
    this.lastIdSeen = 1;
    this.numberOfUserPerPage = 5;
    this.lastPage=0;
    this.isSearch = false;
  }

  ngOnInit() {
    this.userService.getAll().subscribe( (data:any) => {
      this.usersCount = data.length;
      this.usersPageCount = Math.ceil(Number(this.usersCount)/this.numberOfUserPerPage)
      this.userService.getUsersPerPage(this.numberOfUserPerPage,this.lastIdSeen).subscribe( (data: any) => {
      this.users = data;
      this.lastIdSeen = this.users[data.length - 1].id;
    })
    })

  }

 
  

  search() {
    this.isSearch = true;
    this.userService.search(this.keyword.value, this.numberOfUserPerPage,1).subscribe( (data:any) => {
       if ( data.total_count > 200) {
         this.usersCount = 200; 
       } else {
          this.usersCount = data.total_count;
       }
         
      this.usersPageCount = Math.ceil(Number(this.usersCount)/this.numberOfUserPerPage)
      this.users = data.items;
    })
  }

  searchCurrent(index:any) {
    this.pages.fill(false);
    this.pages[index] = true;
    
  }

  navigateUser(user:any) {
    this.router.navigate(['./user-details/', user.login])
    console.log("user",user);
  }

  pageNum(currentPage) {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.userService.getUsersPerPage(this.numberOfUserPerPage,this.lastIdSeen).subscribe( (data: any) => {
      this.users = data;
      this.lastIdSeen = this.users[data.length - 1].id;
      
    })
  }

  pageNumSearch(currentPage) {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.userService.search(this.keyword.value, this.numberOfUserPerPage,currentPage).subscribe( (data:any) => {
    this.users = data.items;
    })
  }
}
