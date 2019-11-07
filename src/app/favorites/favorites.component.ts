import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service'


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FavoritesComponent implements OnInit {
 public favorites :any;
 




  constructor( private localStorage: LocalStorageService ) {

  }
  ngOnInit() {
    this.favorites = this.localStorage.get('favorites');
    console.log("this.favorites", this.favorites)
  }

  public moveItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
    this.localStorage.set('favorites',list);
  }


  public delete(item:any, list:any[]){
    if (list.map(function(user) { return user.login; }).indexOf(item.login) == 0) {

      if (list.length == 1) {
        console.log("Only One Item In list")
        this.localStorage.set('favorites',[]);
        this.favorites = []
      }
      console.log("first item in list")
      list.shift();
      this.favorites = list;
      this.localStorage.set('favorites',list);
    } else if (list.map(function(user) { return user.login; }).indexOf(item.login) == list.length-1) {
      list.pop();
      this.favorites = list;
      this.localStorage.set('favorites',list);
      
    }  else {
      this.favorites.splice(this.favorites.map(function(user) { return user.login; }).indexOf(item.login),1);
      this.localStorage.set('favorites',this.favorites);
    }
  }
}
