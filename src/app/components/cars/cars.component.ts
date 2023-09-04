import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Car } from 'src/app/models/car/car.model';
import { deleteCar, loadCars } from 'src/app/state/car/car.actions';
import { selectAllCars } from 'src/app/state/car/car.selector';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCars());
    this.store.select(selectAllCars).subscribe((selectedCars) => {
      this.cars = selectedCars;
    });
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

}
