import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalStorageService } from '../services/local-storage.service'

import {  Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required ),
    email: new FormControl('',  [Validators.email,Validators.required]  ),
    password: new FormControl('', [ Validators.required, Validators.minLength(6)] ),
    confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(6)]),
    gender: new FormControl(),
    birthdate: new FormControl(),
    image: new FormControl()
  });
  gender = 'Gender *'
  checkUsername:boolean;
  checkEmail:boolean;
  checkPassword: boolean;
  constructor(private localStorage :LocalStorageService, private router: Router) { 
    this.checkEmail = false;
    this.checkPassword= false;
    this.checkUsername = false;
  }

  ngOnInit() {
     this.signUpForm.patchValue({
      'gender': this.gender
    });
  }

  
  signUp() {
    this.checkUsername = false;
    this.checkEmail = false;
    this.checkPassword = false;
    var arr = [];
    if ( this.signUpForm.value.password !== this.signUpForm.value.confirmPassword ) {
      this.checkPassword = true;
      return;
    }
    if (this.localStorage.get('users') != null) {
      arr = this.localStorage.get('users');
      for( let i=0; i<arr.length; i++) {
        if( arr[i].userName == this.signUpForm.value.userName ){
          this.checkUsername = true;
          return;
        } else if ( arr[i].email == this.signUpForm.value.email ) {
          this.checkEmail = true;
          return;
        }
        
      }
      
      this.
      arr.push(this.signUpForm.value);
      this.localStorage.set('currentUser', this.signUpForm.value);
      this.localStorage.set('users',arr);
      
      this.router.navigate(['/home']);

    } else {
      console.log("shokry")
     arr.push(this.signUpForm.value);
     this.localStorage.set('currentUser', this.signUpForm.value);
     this.localStorage.set('users',arr);
     this.router.navigate(['/home']);
    }
  }

  get username() {
    return this.signUpForm.get('username')
  }
  
  get email() {
    return this.signUpForm.get('email')
  }
  get genderControl() {
      return this.signUpForm.get('gender');
  }

}
