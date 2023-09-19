import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Car } from "src/app/models/car/car.model";


export const selectCarsFeature = createSelector(
    (state: AppState) => state.car,
    (car) => car
);

export const selectCarsIds = createSelector(
    selectCarsFeature,
    (car) => car.ids
);

export const selectCarById = (id: string) => createSelector(selectCarsFeature, (cars) => {
    return cars.entities[id];
});

export const selectAllCars = createSelector(selectCarsFeature, (car) =>
    car.ids
        .map((id) => car.entities[id])
        .filter((car) => car != null)
        .map((car) => <Car>car)
);


export const selectCarBrands = createSelector(selectAllCars, (cars) => {
    const uniqueMakesSet = new Set<string>();
    cars.forEach((car) => {
        uniqueMakesSet.add(car.brand);
    });
    return Array.from(uniqueMakesSet).sort();
});

export const selectCarsByBrand = (make: string) => createSelector(
    selectAllCars,
    (cars) => {
        const filteredCars: Car[] = [];
        if (make) {
            cars.forEach((car) => {
                if(car.brand === make) {
                    filteredCars.push(car);
                }
            })
        }
        return filteredCars;    
    }
);

export const selectCarCategories = createSelector(
    selectCarsFeature,
    (state) => state.carCategories
)
