import { createAction, props } from "@ngrx/store";
import { CreateModEngineDto } from "src/app/models/engine/create-mod-engine-dto";
import { Engine } from "src/app/models/engine/engine.model";

export const loadEngines = createAction('loadEngines');
export const loadEnginesSuccess = createAction(
    'loadEnginesSuccess',
    props<{ engines: Engine[] }>()
);

export const loadEngine = createAction(
    'loadEngine',
    props<{ engineId: string }>()
);
export const loadEngineSuccess = createAction(
    'loadEngineSuccess',
    props<{ engine: Engine }>()
);

export const addEngine = createAction(
    'addEngine',
    props<{ engineData: CreateModEngineDto }>()
);
export const addEngineSuccess = createAction(
    'addEngineSuccess',
    props<{ engine: Engine }>()
);

export const updateEngine = createAction(
    'updateEngine',
    props<{ engineId: string, engineData: CreateModEngineDto}>()
);
export const updateEngineSuccess = createAction(
    'updateEngineSuccess',
    props<{ engine: Engine }>()
);

export const deleteEngine = createAction(
    'deleteEngine',
    props<{ engineId: string }>()
);
export const deleteEngineSuccess = createAction(
    'deleteEngineSuccess',
    props<{ engineId: string }>()
);