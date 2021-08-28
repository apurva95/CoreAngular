import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  Users: any;
  verified: boolean = false;

  /**
   * Dependency inject for the httpclient
   */
  constructor(private http: HttpClient, private accountSrvice : AccountService) {
  }
  ngOnInit(): void {
   this.getUsers();
   this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    this.accountSrvice.setCurrentUser(user);
  }

  getUsers()
  {
    this.http.get("https://localhost:44396/api/Users").subscribe(next=> this.Users = next);
  }

  
  // Submit()
  // {
  //   var userName = document.getElementById("user");
  //   var password = document.getElementById("user");
  //   debugger
  //   this.http.post("https://localhost:44396/api/Account",
  //   {
  //     "username": userName?.nodeValue,
  //     "password": password?.nodeValue
  //   });
  // }
  
}
