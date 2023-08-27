import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { PartsService } from "src/app/services/parts.service";
import * as PartCategoryActions from 'src/app/state/part-categories/part-categories.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartCategory } from "src/app/models/part-category.model";

@Injectable()
export class PartCategoryEffects {

    constructor(private router: Router, private partService: PartsService, private action$: Actions, private snackBar: MatSnackBar) {

    }

    loadPartCategories$ = createEffect(() => 
        this.action$.pipe(
            ofType(PartCategoryActions.loadPartCategories),
            mergeMap(() => 
                this.partService.getPartCategories().pipe(
                    map((partCategories: PartCategory[]) => {
                        return PartCategoryActions.loadPartCategoriesSuccess({ partCategories });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

}