import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { deleteCar, loadCars, stringSearchCars } from 'src/app/state/car/car.actions';
import { selectAllCars } from 'src/app/state/car/car.selector';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  inputString: string = "";
  cars$!: Observable<Car[]>;  
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCars());
    this.cars$ = this.store.select(selectAllCars);
  }

  addClick() {
    this.router.navigate(['/add-car']);
  }

  updateClick(carId: string) {
    this.router.navigate(['/update-car/' + carId]);
  }

  deleteClick(carId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      this.store.dispatch(deleteCar({carId}));
    }
  }

  seachClick() {
    if(this.inputString !== "") {
      this.store.dispatch(stringSearchCars({ searchString: this.inputString }));
    } 
  }
}
