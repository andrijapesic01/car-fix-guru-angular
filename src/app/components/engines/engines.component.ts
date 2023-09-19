import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Engine } from 'src/app/models/engine/engine.model';
import { deleteEngine, loadEngines, searchEngines } from 'src/app/state/engine/engine.actions';
import { selectAllEngines } from 'src/app/state/engine/engine.selector';

@Component({
  selector: 'app-engines',
  templateUrl: './engines.component.html',
  styleUrls: ['./engines.component.css']
})
export class EnginesComponent implements OnInit {
  //engines: Engine[] = [];
  /* this.store.select(selectAllEngines).subscribe((selectedEngines) => {
      this.engines = selectedEngines;
    }) */
  engines$! : Observable<Engine[] | undefined>;
  inputString: string = "";

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() : void {
    this.store.dispatch(loadEngines());
    this.engines$ = this.store.select(selectAllEngines);
  }

  updateClick(event: string) {
    if (event) {
      console.log(event);
      this.router.navigate(['/update-engine/'+event]);
    }
  }

  deleteClick(event: any) {
    const confirmDelete = window.confirm('Are you sure you want to delete this engine?');
    if (confirmDelete) {
      this.store.dispatch(deleteEngine({ engineId: event }));
    }
  }

  addClick() {
    this.router.navigateByUrl('add-engine');
  }

  searchClick() {
    if(this.inputString !== "") {
      this.store.dispatch(searchEngines({ searchString: this.inputString }));
    }
  }

}
