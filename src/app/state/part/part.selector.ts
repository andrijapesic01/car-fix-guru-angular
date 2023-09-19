import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Part } from "src/app/models/part/part.model";

export const selectPartsFeature = createSelector(
    (state: AppState) => state.part,
    (part) => part
);

export const selectPartsIds = createSelector(
    selectPartsFeature,
    (part) => part.ids
);
  
export const selectPartById = (id: string) => createSelector(selectPartsFeature, (parts) => {
    return parts.entities[id];
});
  
export const selectAllParts = createSelector(selectPartsFeature, (part) =>
    part.ids
        .map((id) => part.entities[id])
        .filter((part) => part != null)
        .map((part) => <Part>part)
);

export const selectPartsByPage = (pageNumber: number, selectNumber: number) => createSelector(selectAllParts, (parts) => {
   let returnParts: Part[] = [];
   for(let i = pageNumber * selectNumber; i < pageNumber * selectNumber + selectNumber; i++) {
    if(i < parts.length) {
        returnParts.push(parts[i]);
    }
    else {
        break;
    }
   }
   return returnParts;
});

export const selectPartsCount = createSelector(selectPartsFeature, (parts) => {
    return parts.ids.length;
});

/* export const selectUploadedImgUrls = createSelector(selectPartsFeature, (state) => {
    return state.uploadedImgUrls
}); */

export const selectPartManufacturers = createSelector(selectPartsFeature, (state) => {
    return state.manufacturers
});