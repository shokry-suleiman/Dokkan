import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
   users: any;
   signInForm: FormGroup = new FormGroup({
    email: new FormControl('',  [Validators.email,Validators.required]  ),
    password: new FormControl('', [ Validators.required, Validators.minLength(6)] ),
  });

  

  constructor( private localStorage: LocalStorageService, private authService:AuthenticationService,
               private router: Router ) {
                 this.users = [];
                }

  ngOnInit() {
    this.users = this.localStorage.get('users');
  }


  signIn () {
    let email = this.signInForm.value.email;
    let password = this.signInForm.value.password; 
    if( this.localStorage.get('users') != null ) {
      this.users.map(function(user) { 
      if ( user.email ==  email && user.password == password ) {
        this.localStorage.set('currentUser', user);
        this.authService.currentUser.next(user);
        this.router.navigate(['/home'])
      }
    }, this)
      this.signInForm.reset();
    } else {
      this.signInForm.reset(); 
    }
    
  }
}
