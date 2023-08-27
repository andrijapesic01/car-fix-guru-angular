import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Engine } from "src/app/models/engine/engine.model";


export const selectEnginesFeature = createSelector(
    (state: AppState) => state.engine,
    (engine) => engine
);

export const selectEngineIds = createSelector(
    selectEnginesFeature,
    (engine) => engine.ids
);
  
export const selectEngineById = (id: string) => createSelector(selectEnginesFeature, (engines) => {
    return engines.entities[id];
});
  
export const selectAllEngines = createSelector(selectEnginesFeature, (engines) =>
    engines.ids
        .map((id) => engines.entities[id])
        .filter((engine) => engine != null)
        .map((engine) => <Engine>engine)
);