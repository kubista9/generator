import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state';

export const selectProfileState = createFeatureSelector<UserState>('users');

export const selectProfile = createSelector(
  selectProfileState,
  (state: UserState) => {
    return state.profile;
  }
);

export const selectProfileId = createSelector(
  selectProfileState,
  (state: UserState) => {
    //return state.profile?.id;
  }
);
