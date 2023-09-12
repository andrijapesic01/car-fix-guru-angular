import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user/user';
import { logoutUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user$! : Observable<User | null>;
  
  constructor(private store: Store<AppState>) {

  }
  
  ngOnInit(): void {
    this.user$ = this.store.select(state => state.user.user);
  }

  logOut() {
    this.store.dispatch(logoutUser());
  }
}
