import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertState } from '../state';

export const selectStateAlerts = createFeatureSelector<AlertState>('alerts');

export const selectCurrentAlert = createSelector(
  selectStateAlerts,
  (state: AlertState) => {
    return state.currentAlert;
  }
);
