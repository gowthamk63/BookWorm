import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login_check():Boolean{
    if (localStorage.getItem('currentUser')) {
      return true;
  }
  }
  
  logout(){
    this.auth.logout();
    }
}
