import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  constructor(private account: AccountService) { }

  ngOnInit(): void {
  }
  login(): void
  {
    this.account.login(this.model).subscribe(response=> 
    {
        console.log(response);
        this.loggedIn = true;
    },error => console.error(error)
    );
    console.log("Login pressed "+ this.model.username + this.model.password);
  }

  logout()
  {
    this.loggedIn = false;
  }

}
