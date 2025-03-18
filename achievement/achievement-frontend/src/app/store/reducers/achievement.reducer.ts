import { createReducer, on } from '@ngrx/store';
import * as AchievementActions from '../actions/achievements.actions';
import { initialState } from '../state';

export const achievementReducer = createReducer(
  initialState,
  on(AchievementActions.loadAchievements, state => ({
    ...state,
    loading: true
  })),
  on(AchievementActions.loadAchievementsSuccess, (state, { achievements }) => ({
    ...state,
    achievements,
    loading: false
  })),
  on(AchievementActions.loadAchievementsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(AchievementActions.deleteAchievementSuccess, (state, { id }) => ({
    ...state,
    achievements: state.achievements.filter(achievement => achievement.id !== id)
  })),
  on(AchievementActions.loadAchievementDetails, state => ({
    ...state,
    loading: true,
    selectedAchievement: null
  })),
  on(AchievementActions.loadAchievementDetailsSuccess, (state, { achievement }) => ({
    ...state,
    selectedAchievement: achievement,
    loading: false
  })),
  on(AchievementActions.loadAchievementDetailsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(AchievementActions.updateAchievementSuccess, (state, { achievement }) => ({
    ...state,
    achievements: state.achievements.map(a => 
      a.id === achievement.id ? achievement : a
    ),
    selectedAchievement: achievement
  })),
  on(AchievementActions.createAchievementSuccess, (state, { achievement }) => ({
    ...state,
    achievements: [...state.achievements, achievement]
  })),
  on(AchievementActions.updateAchievementStatusSuccess, (state, { id, status }) => ({
    ...state,
    achievements: state.achievements.map(achievement => 
      achievement.id === id ? { ...achievement, status } : achievement
    )
  }))
);