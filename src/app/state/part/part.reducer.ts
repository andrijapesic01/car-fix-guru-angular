import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Part } from "src/app/models/part/part.model";
import * as PartActions from './part.actions' 

export interface PartState extends EntityState<Part> {
    parts: Part[],
    category: string | null;
    subCategory: string | null;
    loading: boolean;    
}

const adapter: EntityAdapter<Part> = createEntityAdapter<Part>();

export const initialState: PartState = adapter.getInitialState({
    parts: [],
    category: null,
    subCategory: null,
    loading: false 
});

export const partReducer = createReducer(
    initialState,
    on(PartActions.loadParts, (state) => ({
        ...state,
        loading: true,
    })),
    on(PartActions.loadPartSuccess, (state: PartState, { part }) => {
        return adapter.setOne(part, state)
    }),
    on(PartActions.loadPartsSuccess, (state: PartState, { parts }) => {
        return adapter.setAll(parts, state)
    }),
    on(PartActions.loadSearchedPartsSuccess, (state: PartState, {parts}) => {
        return adapter.setAll(parts, state)
    }),
    on(PartActions.loadCertainNumOfPartsSuccess, (state: PartState, {parts}) => {
        return adapter.setAll(parts, state)
    }),
    on(PartActions.addPartSuccess, (state: PartState, { part } ) => {
        return adapter.addOne(part, state)
    }),
    on(PartActions.updatePartSuccess, (state: PartState, { part }) => {
        return adapter.updateOne({
            id: part.id,
            changes: {
                name: part.name,
                manufacturer: part.manufacturer, 
                category: part.category,
                subCategory: part.subCategory,
                referenceNumber: part.referenceNumber,
                imgURLs: part.imgURLs,
                carIDs: part.carIDs,
                engineIDs: part.engineIDs,
                quantity: part.quantity,
                price: part.price
            },
        },
        state
        );
    }),
    on(PartActions.deletePartSuccess, (state: PartState, { partId }) => {
        return adapter.removeOne(partId, state);
    }),
    on(PartActions.stringSearchSuccess, (state: PartState, { parts }) => {
        return adapter.setAll(parts, state);
    }) 
);



