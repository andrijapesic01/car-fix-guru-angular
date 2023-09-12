import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  role = "admin";
  //role = "user";
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City',
    phoneNumber: '123-456-7890'
  };

  showChangePasswordForm = false;
  oldPassword = '';
  newPassword = '';

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
