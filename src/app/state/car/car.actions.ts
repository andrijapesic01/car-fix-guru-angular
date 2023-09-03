import { createAction, props } from "@ngrx/store";
import { Car } from "src/app/models/car/car.model";
import { CreateModCarDto } from "src/app/models/car/create-mod-car.dto";

export const loadCars = createAction('loadCars');
export const loadCarsSuccess = createAction(
    'loadCarsSuccess',
    props<{ cars: Car[] }>()
);

export const loadCar = createAction(
    'loadCar',
    props<{ carId: string }>()
);
export const loadCarSuccess = createAction(
    'loadCarSuccess',
    props<{ car: Car }>()
);

export const loadSearchedCars = createAction(
    'loadSearchedCars',
    props<{ input: string, car: Car}>()
);
export const loadSearchedCarsSuccess = createAction(
    'loadSearchedCarsSuccess',
    props<{ cars: Car[] }>()
);

export const addCar = createAction(
    'addCar',
    props<{ carData: CreateModCarDto }>()
);
export const addCarSuccess = createAction(
    'addCarSuccess',
    props<{ car: Car }>()
);

export const updateCar = createAction(
    'updateCar',
    props<{ carId: string, carData: CreateModCarDto}>()
);
export const updateCarSuccess = createAction(
    'updateCarSuccess',
    props<{ car: Car }>()
);

export const deleteCar = createAction(
    'deleteCar',
    props<{ carId: string }>()
);
export const deleteCarSuccess = createAction(
    'deleteCarSuccess',
    props<{ carId: string }>()
);