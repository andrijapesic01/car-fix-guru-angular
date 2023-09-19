import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { PartCategory } from 'src/app/models/part-category/part-category.model';
import { Part } from 'src/app/models/part/part.model';
import { User } from 'src/app/models/user/user';
import { loadPartCategories } from 'src/app/state/part-categories/part-categories.actions';
import { selectAllPartCategories } from 'src/app/state/part-categories/part-categories.selector';
import * as PartActions from 'src/app/state/part/part.actions';
import { loadPartManufacturers, loadParts, loadSearchedParts, stringSearch } from 'src/app/state/part/part.actions';
import { selectPartsCount, selectAllParts, selectPartManufacturers, selectPartsByPage } from 'src/app/state/part/part.selector';
import { selectUser } from 'src/app/state/user/user.selector'; 

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})

export class PartsComponent implements OnInit {
  filterForm: FormGroup;
  pageSizeOptions: number[] = [4, 8, 12, 16, 20];
  pageSize: number = this.pageSizeOptions[1];
  parts$?: Observable<Part[]>;
  partsCount$?: Observable<number>;
  searchString: string = '';
  categories!: PartCategory[];
  subcategories: string[] = [];
  manufacturers: string[] = [];
  selectedCategory!: PartCategory;
  selectedSubCategory: string = "";
  selectedManufacturer: string = "";
  carId: string = ""; engineId: string = "";
  filtersAplied: boolean = false;
  user!: User | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {

    this.filterForm = this.formBuilder.group({
      category: false,
      subcategory: false,
      manufacturer: false
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PartActions.loadParts());
    this.partsCount$ = this.store.select(selectPartsCount);
    this.parts$ = this.store.select(selectPartsByPage(0, this.pageSize));
    this.initializeForm();
  }

  initializeForm() {
    this.store.dispatch(loadPartCategories());
    this.store.dispatch(loadPartManufacturers());
    this.store.select(selectUser).subscribe((selectedUser) => this.user = selectedUser);
    this.store.select(selectAllPartCategories).subscribe((partCategories) => this.categories = partCategories);
    this.store.select(selectPartManufacturers).subscribe((selectedManufacturers) =>
      this.manufacturers = selectedManufacturers
    );
  }

  btnCartClikced() {
    this.router.navigate(['/cart']);
  }

  onPageChange() {
    const currentPage = this.paginator.pageIndex;
    this.parts$ = this.store.select(selectPartsByPage(currentPage, this.pageSize));
  }

  onPageSizeChange(event: any) {
    this.paginator.pageIndex = 0;
    this.parts$ = this.store.select(selectPartsByPage(this.paginator.pageIndex, this.pageSize));
  }

  stringSearchClick() {
    if (this.searchString !== '') {
      console.log(this.searchString);
      this.store.dispatch(stringSearch({ searchString: this.searchString }));
    }
  }

  onCarSearchButtonClicked(eventData: [string, string]) {
    const [carId, engineId] = eventData;
    this.engineId = engineId;
    this.carId = carId;
    if (carId !== "" && engineId !== "") {
      this.store.dispatch(loadSearchedParts({ carId, engineId, category: "", subCategory: "",
        manufacturer: "" }));
    }
    else {
      this.store.dispatch(loadParts());
      this.parts$ = this.store.select(selectAllParts);
    } 
  }

  partCardClick(part: Part) {
    this.router.navigate(['/part/' + part.id]);
  }

  btnAddClick() {
    this.router.navigate(['/add-part']);
  }

  onCategoryChange() {
    this.subcategories = [];
    this.selectedCategory.subCategories.forEach((subCategory) => this.subcategories.push(subCategory.subCategory));
  }

  applyClick() {
    this.filtersAplied = true;
    let retCategory: string = '';
    if (this.selectedCategory) {
      retCategory = this.selectedCategory.name;
    }
    this.store.dispatch(PartActions.loadSearchedParts({
      carId: this.carId,
      engineId: this.engineId,
      category: retCategory,
      subCategory: this.selectedSubCategory,
      manufacturer: this.selectedManufacturer
    }));
  }

  resetClick() {
    this.filtersAplied = false;
    this.resetFilterSelectors();
  }

  resetFilterSelectors() {
    this.selectedManufacturer = "";
    this.store.select(selectAllPartCategories).subscribe((partCategories) => this.categories = partCategories);
  }

  getTotalPages(): number {
    let parts = 0;
    this.partsCount$?.subscribe((pc) => parts = pc);
    const size = this.pageSize;
    return Math.ceil(parts / size);
  }
}

