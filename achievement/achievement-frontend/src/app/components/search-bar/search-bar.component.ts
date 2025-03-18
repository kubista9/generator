import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as SearchActions from '../../store/actions/search.actions';
import { selectFilteredAchievements } from '../../store/selectors/search.selector';
import { Achievement } from '../../store/state';
import { DpsAutocompleteValueAccessor } from '../dps-input/dps.autocomplete.value.accessor';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    DpsAutocompleteValueAccessor
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})

export class SearchBarComponent implements OnDestroy, OnInit {
  filteredAchievements$: Observable<Achievement[]> | undefined;
  searchQuery: string = '';
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.filteredAchievements$ = this.store.pipe(select(selectFilteredAchievements));
  }

  constructor(private store: Store) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((query) => {
      this.store.dispatch(SearchActions.setSearchQuery({ query }));
    });
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}