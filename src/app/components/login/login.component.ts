import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.loading = state.user.loading;
    });
  }


  
  onClick(mail: string, pass: string) {
    this.store.dispatch(loginUser({ email: mail, password: pass }))
  }
  
}

