import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser:any;
  constructor( private userService: UserService, private localStorage :LocalStorageService, 
               private authService: AuthenticationService) { 

  }

  ngOnInit() {
    this.currentUser = this.localStorage.get('currentUser');
    this.authService.currentUser.subscribe( (data:any) => {
      this.currentUser = data;
    })
  }

}
