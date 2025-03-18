import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AchievementState } from '../state';

export const selectAchievementState = createFeatureSelector<AchievementState>('achievement');

export const selectAllAchievements = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.achievements
);

export const deleteAchievement = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.loading
); 

export const selectAchievementsLoading = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.loading
);

export const selectAchievementsError = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.error
);

export const selectSelectedAchievement = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.selectedAchievement
);

export const createAchievement = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.selectedAchievement
)