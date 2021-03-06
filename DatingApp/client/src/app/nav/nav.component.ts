import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }
  login(): void
  {
    this.accountService.login(this.model).subscribe(response=> 
    {
        console.log(response);
        this.loggedIn = true;
    },error => console.error(error)
    );
    console.log("Login pressed "+ this.model.username + this.model.password);
  }

  logout()
  {
    this.accountService.logout();
  }

}
