import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Car } from "src/app/models/car/car.model";
import * as CarActions from './car.actions' 

export interface CarState extends EntityState<Car> {
    cars: Car[],
    make: string;
    model: string;
    engine: string;
    loading: boolean;    
}

const adapter: EntityAdapter<Car> = createEntityAdapter<Car>();

export const initialState: CarState = adapter.getInitialState({
    cars: [],
    make: '',
    model: '',
    engine: '',
    loading: false 
});

export const carReducer = createReducer(
    initialState,
    on(CarActions.loadCars, (state) => ({
        ...state,
        loading: true,
    })),
    on(CarActions.loadCarSuccess, (state: CarState, { car }) => {
        return adapter.setOne(car, state)
    }),
    on(CarActions.loadCarsSuccess, (state: CarState, { cars }) => {
        return adapter.setAll(cars, state)
    }),
    on(CarActions.loadSearchedCarsSuccess, (state: CarState, {cars}) => {
        return adapter.setAll(cars, state)
    }),
    on(CarActions.addCarSuccess, (state: CarState, { car } ) => {
        return adapter.addOne(car, state)
    }),
    on(CarActions.updateCarSuccess, (state: CarState, { car }) => {
        return adapter.updateOne({
            id: car.id,
            changes: {
                brand: car.brand,
                model: car.model, 
                generation: car.generation,
                category: car.category,
                yearFrom: car.yearFrom,
                yearTo: car.yearTo,
                engineIDs: car.engineIDs,
            },
        },
        state
        );
    }),
    on(CarActions.deleteCarSuccess, (state: CarState, { carId }) => {
        return adapter.removeOne(carId, state);
    }) 
);