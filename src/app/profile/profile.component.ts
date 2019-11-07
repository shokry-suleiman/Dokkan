import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalStorageService } from '../services/local-storage.service'

import {  Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   editForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required ),
    email: new FormControl('',  [Validators.email,Validators.required]  ),
    currentpassword: new FormControl('',[ Validators.required, Validators.minLength(6)]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    gender: new FormControl(),
    birthdate: new FormControl(),
    image: new FormControl()
  });
  
  currentUser: any;
  checkUsername:boolean;
  checkEmail:boolean;
  checkPassword: boolean;
  checkCurrentPassword:boolean;
  constructor( private localStorage:LocalStorageService, private router: Router) { }

  ngOnInit() {
  
  this.currentUser = this.localStorage.get('currentUser');
  this.editForm.patchValue( {
    userName: this.currentUser.userName,
    email: this.currentUser.email,
    currentPassword: this.currentUser.password,
    gender: this.currentUser.gender,
    birthdate: this.currentUser.birthdate
  })
  }

  save() {
    this.checkEmail = false;
    this.checkPassword= false;
    this.checkUsername = false;
    this.checkCurrentPassword = false;
    let user;
    let allUsers;
    if (this.editForm.value.currentpassword != this.currentUser.password) {
      this.checkCurrentPassword = true;
      return;
    } else if ( this.editForm.value.password !== this.editForm.value.confirmPassword ) {
      this.checkPassword = true;
      return;
    }

    if ( this.editForm.value.password.length == 0 ) 
      user = {"userName": this.editForm.value.userName ,"email": this.editForm.value.email,"password": this.currentUser.password,"confirmPassword": this.currentUser.confirmPassword ,"gender":  this.editForm.value.gender,"birthdate":this.editForm.value.birthdate,"image": this.editForm.value.image }
    else 
      user = {"userName": this.editForm.value.userName ,"email": this.editForm.value.email,"password": this.editForm.value.password,"confirmPassword": this.editForm.value.confirmPassword ,"gender":  this.editForm.value.gender,"birthdate":this.editForm.value.birthdate,"image": this.editForm.value.image }
  
   
    allUsers = this.localStorage.get('users');
    allUsers[allUsers.map(function(user) { return user.email; }).indexOf(this.currentUser.email)] = user;
    this.localStorage.set('users', allUsers);
    this.localStorage.set('currentUser', user);
    this.router.navigate(['/home'])
  }

  cancel() {
    this.editForm.reset();
    this.router.navigate(['/home'])
  }
}
