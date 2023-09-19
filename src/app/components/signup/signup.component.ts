import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { CreateModUserDto } from 'src/app/models/user/create-mod-user.dto';
import { registerUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      city: [''],
      country: [''],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onClick() {
    console.log("Sign up btn clicked!");
    if (this.registrationForm.valid) {
      console.log("Form is valid. Submitting...");
      const userData: CreateModUserDto = {
        fname: this.registrationForm.get('firstName')?.value,
        lname: this.registrationForm.get('lastName')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        address: this.registrationForm.get('address')?.value,
        cityAndState: (this.registrationForm.get('city')?.value + "," + this.registrationForm.get('country')?.value),
        phoneNumber: this.registrationForm.get('phoneNumber')?.value,
        role: "user"
      }
      console.log(userData);
      this.store.dispatch(registerUser({ userData }));
    } else {
      this.snackBar.open(
        "All fields must be filled before submiting!", "Close",
        { duration: 3000 }
      );
    }
  }
}
