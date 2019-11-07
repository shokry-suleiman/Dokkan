import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service'
import { LocalStorageService } from '../services/local-storage.service'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user:any;
  numberRepoPerPage:any;
  userRepos: any [];
  reposCount: any;
  currentUser: any ;
  inFavorities:boolean;
  constructor(private route: ActivatedRoute , private userService: UserService, 
              private localStorage:LocalStorageService, private authService: AuthenticationService ) { 
              this.numberRepoPerPage = 5;
              this.currentUser = null;
              this.inFavorities = false;
  }

  ngOnInit() {
    this.userService.getUserDetail(this.route.snapshot.paramMap.get('username')).subscribe( (data:any) => {
      this.user = data;
      this.reposCount = data.public_repos
      this.checkFavorities();
      console.log("data", data)
    })
        
    this.userService.getUserRepos(this.route.snapshot.paramMap.get('username'), this.numberRepoPerPage, 1).subscribe( (data:any) => {
      this.userRepos = data;
    })

    this.currentUser = this.localStorage.get('currentUser');

    this.authService.currentUser.subscribe( (data:any) => {
      this.currentUser = data;
    })

    
  }
  pageNum(currentPage) {
    window.scroll({ 
      top: 100, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.userService.getUserRepos(this.route.snapshot.paramMap.get('username'), this.numberRepoPerPage, currentPage).subscribe( (data:any) => {
      this.userRepos = data;
    })
  }

  addToFavorite() {
    this.inFavorities = true;
    if ( this.localStorage.get('favorities') == null ) {
        let fav = [];
        fav.push({ 'login' : this.user.login, 'avatar_url': this.user.avatar_url , 'type': this.user.type , 'html_url': this.user.html_url  })
        this.localStorage.set('favorities', fav)
       
    } else {
      let fav = this.localStorage.get('favorities');
      fav.push({ 'login' : this.user.login, 'avatar_url': this.user.avatar_url , 'type': this.user.type , 'html_url': this.user.html_url  })
      this.localStorage.set('favorities', fav)
    }
  }

  checkFavorities() {
    
    if ( this.localStorage.get('favorities') == null ) {
        this.inFavorities = false;
    
    } else {
      let fav = this.localStorage.get('favorities');
      fav.map(function(user) { 
      if ( user.login ==  this.user.login ) {
        this.inFavorities = true;
      }
    }, this)

    }
  }
}
