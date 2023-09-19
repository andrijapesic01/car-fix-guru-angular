import { createAction, props } from "@ngrx/store";
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

export const loadCertainNumOfParts = createAction(
    'loadCertainNumOfParts',
    props<{ numOfParts: number}>()
);
export const loadCertainNumOfPartsSuccess = createAction(
    'loadCertainNumOfPartsSuccess',
    props<{ parts: Part[] }>()
);

export const loadSearchedParts = createAction(
    'loadSearchedParts',
    props<{ carId: string, engineId: string, category: string, subCategory: string, manufacturer: string }>()
);
export const loadSearchedPartsSuccess = createAction(
    'loadSearchedPartsSuccess',
    props<{ parts: Part[] }>()
);

export const addPart = createAction(
    'addPart',
    props<{ partData: FormData }>()
);
/* export const addPart = createAction(
    'addPart',
    props<{ partData: CreateModPartDto }>()
); */
export const addPartSuccess = createAction(
    'addPartSuccess',
    props<{ part: Part }>()
);

/* export const updatePart = createAction(
    'updatePart',
    props<{ partId: string, partData: CreateModPartDto}>()
); */
export const updatePart = createAction(
    'updatePart',
    props<{ partId: string, partData: FormData}>()
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

export const stringSearch = createAction(
    'stringSearch',
    props<{ searchString: string }>()
);
export const stringSearchSuccess = createAction(
    'stringSearchSuccess',
    props<{ parts: Part[] }>()
);

/* export const uploadPartImages = createAction(
    'uploadPartImages',
    props<{ images: File[] }>()
);
export const uploadPartImagesSuccess = createAction(
    'uploadPartImagesSuccess',
    props<{ imgURLs: string[] }>()
); */

export const loadPartManufacturers = createAction('loadPartManufacturers');
export const loadPartManufacturersSuccess = createAction(
    'loadPartManufacturersSuccess',
    props<{ manufacturers: string[] }>()
);