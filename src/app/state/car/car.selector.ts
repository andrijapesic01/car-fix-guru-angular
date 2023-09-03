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