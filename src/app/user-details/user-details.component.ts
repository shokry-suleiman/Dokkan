import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';



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
  constructor(private route: ActivatedRoute , private userService: UserService ) { 
    this.numberRepoPerPage = 5;
  }

  ngOnInit() {
    this.userService.getUserDetail(this.route.snapshot.paramMap.get('username')).subscribe( (data:any) => {
      this.user = data;
      this.reposCount = data.public_repos
      console.log("data", data)
    })
        
    this.userService.getUserRepos(this.route.snapshot.paramMap.get('username'), this.numberRepoPerPage, 1).subscribe( (data:any) => {
      this.userRepos = data;
    })

  }
  pageNum(currentPage) {
    this.userService.getUserRepos(this.route.snapshot.paramMap.get('username'), this.numberRepoPerPage, currentPage).subscribe( (data:any) => {
      this.userRepos = data;
    })
  }

}
