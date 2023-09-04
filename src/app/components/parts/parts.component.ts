import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Part } from 'src/app/models/part/part.model';
import * as PartActions from 'src/app/state/part/part.actions';
import { selectPartsCount, selectAllParts } from 'src/app/state/part/part.selector';


@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})

export class PartsComponent implements OnInit {
  filterForm: FormGroup;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageSize = 10;

  parts$?: Observable<Part[]>;
  partsCount$?: Observable<number>;
  /* public parts: Part[] = [{ id: "1", name: "Oil Filter", manufacturer: "MAHLE", category: "Filter", subCategory: "Oil filter", 
  imgURLs: ["./assets/part-images/mahle-oil-filter.jpg"], referenceNumber: "OX 143 D", carIDs: [], engineIDs:[], transmissionIDs:[], quantity: 10, price:9.76},
  { id: "2", name: "Brake Discs", manufacturer: "Brembo", category: "Brake", subCategory: "Brake discs", 
  imgURLs: ["./assets/part-images/brembo-brake-disc.jpg"], referenceNumber: "AF001", carIDs: [], engineIDs:[], transmissionIDs:[], quantity: 5, price:144},
  { id: "3", name: "Engine Oil SAE 5W-30", manufacturer: "Motul", category: "Oils and fluids", subCategory: "Engine oil", 
  imgURLs: ["./assets/part-images/motul-oil-5w30.jpg"], referenceNumber: "X8100", carIDs: [], engineIDs:[], transmissionIDs:[], quantity: 0, price:64.3},
  { id: "4", name: "Engine Oil SAE 5W-30", manufacturer: "Motul", category: "Oils and fluids", subCategory: "Engine oil", 
  imgURLs: ["./assets/part-images/motul-oil-5w30.jpg"], referenceNumber: "X8100+", carIDs: [], engineIDs:[], transmissionIDs:[], quantity: 5, price:64.3},
]; */
//totalParts = this.parts.length;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.filterForm = this.formBuilder.group({
      category: false,
      subcategory: false
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PartActions.loadParts());
    this.parts$ = this.store.select(selectAllParts);
    this.partsCount$ = this.store.select(selectPartsCount);
  }

  btnCartClikced() {
    this.router.navigate(['/cart']);
  }

  onPageChange() {
    console.log("Implement page change");
  }

  partCardClick(part: Part) {
    const navigationExtras: NavigationExtras = {
      state: { part: part}
    };
    this.router.navigate(['/part'], navigationExtras);
  }

  btnAddClick() {
    this.router.navigate(['/add-part']);
  }
}
