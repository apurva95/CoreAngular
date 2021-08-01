import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
   
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
