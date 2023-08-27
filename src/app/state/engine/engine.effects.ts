import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { Engine } from "src/app/models/engine/engine.model";
import { EnginesService } from "src/app/services/engines.service";
import * as EngineActions from 'src/app/state/engine/engine.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EngineEffects {

    constructor(private router: Router, private engineService: EnginesService, private action$: Actions, private snackBar: MatSnackBar) {

    }

    loadEngines$ = createEffect(() => 
        this.action$.pipe(
            ofType(EngineActions.loadEngines),
            mergeMap(() => 
                this.engineService.getAllEngines().pipe(
                    map((engines: Engine[]) => {
                        return EngineActions.loadEnginesSuccess({ engines });
                    }),
                    catchError(({error}) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    )

    loadEngine$ = createEffect(() =>
        this.action$.pipe(
            ofType(EngineActions.loadEngine),
            mergeMap(({ engineId }) =>
                this.engineService.getEngineById(engineId).pipe(
                    map((engine: Engine) => {
                        this.snackBar.open('Engine successfully created.', 'Close', {
                            duration: 3000,
                        });
                        return EngineActions.loadEngineSuccess({ engine });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message });
                    })
                )
            )
        )
    );

    createEngine$ = createEffect(() => 
        this.action$.pipe(
            ofType(EngineActions.addEngine),
            mergeMap(({engineData}) => 
                this.engineService.addEngine(engineData).pipe(
                    map((engine) => {
                        this.snackBar.open('Engine successfully added!', 'Okay', {
                            duration: 4000,
                        });
                        this.router.navigate(['/add-engine'], {
                            replaceUrl: true,
                        });
                        return EngineActions.addEngineSuccess({ engine: engine });
                    }),
                    catchError(({ error }) => {
                        this.snackBar.open('Error occured! Adding engine failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: error.message });
                    })
                )
            )
        )
    );                

    updateEngine$ = createEffect(() => 
        this.action$.pipe(
            ofType(EngineActions.updateEngine),
            mergeMap(({ engineId, engineData}) => 
                this.engineService.updateEngine(engineId, engineData).pipe(
                    map((engine: Engine) => {
                        this.snackBar.open('Engine successfully updated.', 'Close', {
                            duration: 3000,
                        });
                        return EngineActions.updateEngineSuccess({ engine });
                    }),
                    catchError(({ error }) => {
                        return of({ type: error.message});
                    })
                )
            )
        )
    );

    deleteEngine$ = createEffect(() =>
        this.action$.pipe(
            ofType(EngineActions.deleteEngine),
            mergeMap(({ engineId }) => {
                const id: string = engineId;
                return this.engineService.deleteEngine(engineId).pipe(
                    map((res) => {
                        if (res.success) {
                        this.snackBar.open('Engine successfully removed.', 'Close', {
                            duration: 3000,
                        });
                        }
                        this.router.navigate(['home'], { replaceUrl: true });
                        return EngineActions.deleteEngineSuccess({ engineId: id });
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
}