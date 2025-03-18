import { createAction, props } from '@ngrx/store';
import { Achievement } from '../state';

export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ searchTerm: string }>()
);

export const setSearchQuery = createAction(
  '[Search] Set Search Query',
  props<{ query: string }>()
);

export const filterAchievements = createAction(
  '[Search] Filter Achievements',
  props<{ achievements: Achievement[] }>()
);