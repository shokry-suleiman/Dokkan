import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  public currentUser = new Subject<any>();

  constructor() { 

  }

  

}
