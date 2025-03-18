import { createReducer, on } from '@ngrx/store';
import { setSearchTerm } from '../actions/search.actions';
import { initialSearchState } from '../state';

export const searchReducer = createReducer(
  initialSearchState,
  on(setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm
  }))
);