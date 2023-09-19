import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Engine } from "src/app/models/engine/engine.model";
import * as EngineActions from './engine.actions' 

export interface EngineState extends EntityState<Engine> {
    fuelTypes: string[];
    loading: boolean;    
}

const adapter: EntityAdapter<Engine> = createEntityAdapter<Engine>();

export const initialState: EngineState = adapter.getInitialState({
    fuelTypes: [],
    loading: false 
});

export const engineReducer = createReducer(
    initialState,
    on(EngineActions.loadEngines, (state) => ({
        ...state,
        loading: true,
    })),
    on(EngineActions.loadEngineSuccess, (state: EngineState, { engine }) => {
        return adapter.setOne(engine, state)
    }),
    on(EngineActions.loadEnginesSuccess, (state: EngineState, { engines }) => {
        return adapter.setAll(engines, state)
    }),
    on(EngineActions.addEngineSuccess, (state: EngineState, { engine } ) => {
        return adapter.addOne(engine, state)
    }),
    on(EngineActions.updateEngineSuccess, (state: EngineState, { engine }) => {
        return adapter.updateOne({
            id: engine.id,
            changes: {
                code: engine.code,
                configuration: engine.configuration, 
                fuelType: engine.fuelType,
                displacement: engine.displacement,
                mark: engine.mark,
                power: engine.power
            },
        },
        state
        );
    }),
    on(EngineActions.deleteEngineSuccess, (state: EngineState, { engineId }) => {
        return adapter.removeOne(engineId, state);
    }), 
    on(EngineActions.loadFuelTypesSuccess, (state, { fuelTypes }) => ({
        ...state,
        fuelTypes: fuelTypes
    })), 
    on(EngineActions.searchEnginesSuccess, (state: EngineState, { engines }) => {
        return adapter.setAll(engines, state);
    }), 
);