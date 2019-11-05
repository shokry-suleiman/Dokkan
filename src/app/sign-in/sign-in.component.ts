import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalStorageService } from '../services/local-storage.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

   signInForm: FormGroup = new FormGroup({
    email: new FormControl('',  [Validators.email,Validators.required]  ),
    password: new FormControl('', [ Validators.required, Validators.minLength(6)] ),
  });

  constructor( private localStorage: LocalStorageService) { }

  ngOnInit() {
    
  }


  signIn () {
    
  }
}
