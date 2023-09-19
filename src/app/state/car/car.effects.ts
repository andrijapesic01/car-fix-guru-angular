import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { Car } from "src/app/models/car/car.model";
import * as CarActions from 'src/app/state/car/car.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarsService } from "src/app/services/cars.service";

@Injectable()
export class CarEffects {

    constructor(private router: Router, private carService: CarsService, private action$: Actions, private snackBar: MatSnackBar) {

    }

    loadCars$ = createEffect(() => 
        this.action$.pipe(
            ofType(CarActions.loadCars),
            mergeMap(() => 
                this.carService.getAllCars().pipe(
                    map((cars: Car[]) => {
                        return CarActions.loadCarsSuccess({ cars });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

    loadCar$ = createEffect(() =>
        this.action$.pipe(
            ofType(CarActions.loadCar),
            mergeMap(({ carId }) =>
                this.carService.getCarById(carId).pipe(
                    map((car: Car) => {
                        return CarActions.loadCarSuccess({ car });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    addCar$ = createEffect(() => 
        this.action$.pipe(
            ofType(CarActions.addCar),
            mergeMap(({carData}) => 
                this.carService.addCar(carData).pipe(
                    map((car) => {
                        this.snackBar.open('Car successfully added!', 'Okay', {
                            duration: 5000,
                        });
                        this.router.navigate(['/cars'], { replaceUrl: true });
                        return CarActions.addCarSuccess({ car: car });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Adding car failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    updateCar$ = createEffect(() => 
        this.action$.pipe(
            ofType(CarActions.updateCar),
            mergeMap(({ carId, carData}) => 
                this.carService.updateCar(carId, carData).pipe(
                    map((car: Car) => {
                        this.snackBar.open('Car successfully updated!', 'Okay', {
                            duration: 4000,
                        });
                        this.router.navigate(['/cars'], { replaceUrl: true });
                        return CarActions.updateCarSuccess({ car });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Updating car failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message});
                    })
                )
            )
        )
    );

    deleteCar$ = createEffect(() =>
        this.action$.pipe(
            ofType(CarActions.deleteCar),
            mergeMap(({ carId }) => {
                const id: string = carId;
                return this.carService.deleteCar(carId).pipe(
                    map((res) => {
                        if (res.success) {
                        this.snackBar.open('Car successfully removed.', 'Close', {
                            duration: 3000,
                        });
                        }
                        this.router.navigate(['/cars'], { replaceUrl: true });
                        return CarActions.deleteCarSuccess({ carId: id });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open(error.message, 'Close', {
                        duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                );
            })
        )
    );

    searchCars$ = createEffect(() => 
        this.action$.pipe(
            ofType(CarActions.stringSearchCars),
            mergeMap(({searchString}) => 
                this.carService.stringSearchCars(searchString).pipe(
                    map((cars: Car[]) => {
                        return CarActions.stringSearchCarsSuccess({ cars });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

    loadCarCategories$ = createEffect(() => 
        this.action$.pipe(
            ofType(CarActions.loadCarCategories),
            mergeMap(() => 
                this.carService.getCarCategories().pipe(
                    map((carCategories: string[]) => {
                        return CarActions.loadCarCategoriesSuccess({ carCategories });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

}