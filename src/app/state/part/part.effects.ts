import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CreateModPartDto } from "src/app/models/part/create-mod-part.dto";
import { Part } from "src/app/models/part/part.model";
import { PartsService } from "src/app/services/parts.service";
import * as PartActions from 'src/app/state/part/part.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PartEffects {

    constructor(private router: Router, private partService: PartsService, private action$: Actions, private snackBar: MatSnackBar) {

    }

    loadParts$ = createEffect(() => 
        this.action$.pipe(
            ofType(PartActions.loadParts),
            mergeMap(() => 
                this.partService.getAllParts().pipe(
                    map((parts: Part[]) => {
                        return PartActions.loadPartsSuccess({ parts });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

    loadPart$ = createEffect(() =>
        this.action$.pipe(
            ofType(PartActions.loadPart),
            mergeMap(({ partId }) =>
                this.partService.getPartById(partId).pipe(
                    map((part: Part) => {
                        return PartActions.loadPartSuccess({ part });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    addPart$ = createEffect(() => 
        this.action$.pipe(
            ofType(PartActions.addPart),
            mergeMap(({partData}) => 
                this.partService.addPart(partData).pipe(
                    map((part) => {
                        this.snackBar.open('Part successfully added!', 'Okay', {
                            duration: 4000,
                        });
                        this.router.navigate(['/part'+ part.id], {
                            replaceUrl: true,
                        });
                        return PartActions.addPartSuccess({ part: part });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Adding part failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    updatePart$ = createEffect(() => 
        this.action$.pipe(
            ofType(PartActions.updatePart),
            mergeMap(({ partId, partData}) => 
                this.partService.updatePart(partId, partData).pipe(
                    map((part: Part) => {
                        return PartActions.updatePartSuccess({ part });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message});
                    })
                )
            )
        )
    );

    deletePart$ = createEffect(() =>
        this.action$.pipe(
            ofType(PartActions.deletePart),
            mergeMap(({ partId }) => {
                const id: string = partId;
                return this.partService.deletePart(partId).pipe(
                    map((res) => {
                        if (res.success) {
                        this.snackBar.open('Part successfully removed.', 'Close', {
                            duration: 3000,
                        });
                        }
                        this.router.navigate(['parts'], { replaceUrl: true });
                        return PartActions.deletePartSuccess({ partId: id });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open(error.message, 'Close', {
                        duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                );
            })
        )
    );

    loadPartCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(PartActions.loadPart),
            mergeMap(({ partId }) =>
                this.partService.getPartById(partId).pipe(
                    map((part: Part) => {
                        return PartActions.loadPartSuccess({ part });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    );
}