import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Roles } from 'src/app/enums/enums';
import { User } from 'src/app/models/user/user';
import { selectUser } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user!: User | null;
  userRole: Roles = Roles.User;
  adminRole: Roles = Roles.Admin;
  showChangePasswordForm = false;
  oldPassword = '';
  newPassword = '';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((selectedUser) =>  this.user = selectedUser); 
  }

  toggleChangePasswordForm() {
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }

  changePassword() {
    this.oldPassword = '';
    this.newPassword = '';
    if(this.oldPassword === this.newPassword)
      alert("Old and new password cannot be the same!");
    this.showChangePasswordForm = false;
  }
}
