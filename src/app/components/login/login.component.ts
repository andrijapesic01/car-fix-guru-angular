import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor() {

  }

  onClick(mail: string, pass: string) {
    //this.engineService.getEngineById();
    //this.engineService.addEngine();
  }
  
}

