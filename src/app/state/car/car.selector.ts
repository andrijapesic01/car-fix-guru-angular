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

export const selectSelectedMake = createSelector(
    selectCarsFeature,
    (state) => state.selectedMake
);

export const selectCarBrands = createSelector(selectAllCars, (cars) => {
    const uniqueMakesSet = new Set<string>();
    cars.forEach((car) => {
        uniqueMakesSet.add(car.brand);
    });
    return Array.from(uniqueMakesSet).sort();
})

/* export const selectCarModels = createSelector(
    selectAllCars,
    selectSelectedMake,
    (cars, selectedMake) => {
        const filteredModels: string[] = [];
        if (selectedMake) {
            cars.forEach((car) => {
                if (car.brand === selectedMake) {
                    const formattedModel = car.model + ' ' + car.generation + ' ' + car.category + ' (' + car.yearFrom
                        + '-' + car.yearTo + ')';

                    filteredModels.push(formattedModel);
                }
            });
        }
        return filteredModels;
    }
); */

export const selectCarsByBrand = createSelector(
    selectAllCars,
    selectSelectedMake,
    (cars, selectedMake) => {
        const filteredCars: Car[] = [];
        if (selectedMake) {
            cars.forEach((car) => {
                if(car.brand === selectedMake) {
                    filteredCars.push(car);
                }
            })
        }
        return filteredCars;    
    }
);

export const selectSelectedCarId = createSelector(
    selectCarsFeature,
    (state) => state.selectedCarId
);

export const selectSelectedEngineId = createSelector(
    selectCarsFeature,
    (state) => state.selectedEngineId
);
