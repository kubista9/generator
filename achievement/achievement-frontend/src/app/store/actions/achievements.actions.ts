import { createAction, props } from '@ngrx/store';
import { Achievement, AchievementToCreate } from '../state';

// get all achievements

export const loadAchievements = createAction(
  '[Achievement] Load Achievements'
);

export const loadAchievementsSuccess = createAction(
  '[Achievement] Load Achievements Success',
  props<{ achievements: Achievement[] }>()
);

export const loadAchievementsFailure = createAction(
  '[Achievement] Load Achievements Failure',
  props<{ error: string }>()
);

// edit achievement

export const loadAchievementDetails = createAction(
  '[Achievements] Load Details',
  props<{ id: string }>()
);
export const loadAchievementDetailsSuccess = createAction(
  '[Achievements] Load Details Success',
  props<{ achievement: Achievement }>()
);
export const loadAchievementDetailsFailure = createAction(
  '[Achievements] Load Details Failure',
  props<{ error: any }>()
);

// delete achievement

export const deleteAchievement = createAction(
  '[Achievements] Delete',
  props<{ id: string }>()
);
export const deleteAchievementSuccess = createAction(
  '[Achievements] Delete Success',
  props<{ id: string }>()
);
export const deleteAchievementFailure = createAction(
  '[Achievements] Delete Failure',
  props<{ error: any }>()
);

// create achievement

export const createAchievement = createAction(
  '[Achievement] Create Achievement',
  props<{ achievement: AchievementToCreate }>()
);

export const createAchievementSuccess = createAction(
  '[Achievement] Create Achievement Success',
  props<{ achievement: Achievement }>()
);

export const createAchievementFailure = createAction(
  '[Achievement] Create Achievement Failure',
  props<{ error: any }>()
);

// update achievement

export const updateAchievement = createAction(
  '[Achievement] Update Achievement',
  props<{ achievement: Achievement }>()
);

export const updateAchievementSuccess = createAction(
  '[Achievement] Update achievemnt Success',
  props<{ achievement: Achievement }>()
)

export const updateAchievementFailure = createAction(
  '[Achievement] Update Achievement Failure',
  props<{ error: any }>()
)

// update achievement status
export const updateAchievementStatus = createAction(
  '[Achievement] Update Achievement Status',
  props<{ id: string, status: 'approved' | 'rejected' }>()
);

export const updateAchievementStatusSuccess = createAction(
  '[Achievement] Update Achievement Status Success',
  props<{ id: string, status: 'approved' | 'rejected' }>()
);

export const updateAchievementStatusFailure = createAction(
  '[Achievement] Update Achievement Status Failure',
  props<{ error: any }>()
);

// in progress, state is being deleted