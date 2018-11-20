import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { FireworksService, Item } from '../fireworks.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  items:Observable<Item[]>;
  user:Observable<any>;
  text:string = "";
  constructor(private fireworks :FireworksService) { }

  ngOnInit() {
    this.user = this.fireworks.getUser();
    this.items = this.fireworks.getItems();
  }


  login(){
    this.fireworks.login();
  }

  logout(){
    this.fireworks.logout();
  }

  addItem():void{
    let item:Item = {
      name:this.text
    };
    this.fireworks.addItem(item);
    this.text = "";
  }

  delItem(id:string):void{
    this.fireworks.delItem(id);
  }

}
