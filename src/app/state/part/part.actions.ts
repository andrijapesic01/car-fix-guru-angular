import { createAction, props } from "@ngrx/store";
import { Car } from "src/app/models/car.model";
import { CreateModPartDto } from "src/app/models/part/create-mod-part.dto";
import { Part } from "src/app/models/part/part.model";

export const loadParts = createAction('loadParts');
export const loadPartsSuccess = createAction(
    'loadPartsSuccess',
    props<{ parts: Part[] }>()
);

export const loadPart = createAction(
    'loadPart',
    props<{ partId: string }>()
);
export const loadPartSuccess = createAction(
    'loadPartSuccess',
    props<{ part: Part }>()
);

export const loadSearchedParts = createAction(
    'loadSearchedParts',
    props<{ input: string, category: string, subCategory: string, car: Car}>()
);
export const loadSearchedPartsSuccess = createAction(
    'loadSearchedPartsSuccess',
    props<{ parts: Part[] }>()
);

export const addPart = createAction(
    'addPart',
    props<{ partData: CreateModPartDto }>()
);
export const addPartSuccess = createAction(
    'addPartSuccess',
    props<{ part: Part }>()
);

export const updatePart = createAction(
    'updatePart',
    props<{ partId: string, partData: CreateModPartDto}>()
);
export const updatePartSuccess = createAction(
    'updatePartSuccess',
    props<{ part: Part }>()
);

export const deletePart = createAction(
    'deletePart',
    props<{ partId: string }>()
);
export const deletePartSuccess = createAction(
    'deletePartSuccess',
    props<{ partId: string }>()
);