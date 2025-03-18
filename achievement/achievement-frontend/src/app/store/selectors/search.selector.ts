import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../state';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchQuery = createSelector(
  selectSearchState,
  (state: SearchState) => state.searchTerm
);

export const selectFilteredAchievements = createSelector(
  selectSearchState,
  (state: SearchState) => state.filteredAchievements
);