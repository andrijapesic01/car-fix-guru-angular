import { Component } from '@angular/core';
import { Engine } from 'src/app/models/engine.model';
import { EnginesService } from 'src/app/services/engines.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  engines: Engine[] = [];
  engine!: Engine;
  constructor(private engineService: EnginesService) {

  }

  onClick(mail: string, pass: string) {
    //this.engineService.getEngineById();
    //this.engineService.addEngine();
  }
  
}

