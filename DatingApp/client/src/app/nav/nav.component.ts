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
  currentUser$ : Observable<User> | undefined;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
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
