import { Alert as AlertMessage, Profile } from '@depsit/chattypes';
import { Subscription } from 'rxjs';

export interface AppState {
  users: User[];
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
}

/* Search State */

export interface SearchState {
  searchTerm: string;
  filteredAchievements: [];
}

export const initialSearchState: SearchState = {
  searchTerm: '',
  filteredAchievements: []
};

/* Error State */

export interface AlertState {
  alerts: AlertMessage[];
  currentAlert?: AlertMessage;
}
  
export const initialAlertState: AlertState = {
  alerts: [],
  currentAlert: undefined,
};

/* User State */

interface UserLoading {
  profile: boolean;
}

export interface UserState {
  profile?: Profile;
  loading: UserLoading;
  disclaimer: boolean;
}
  
export const initialUserState: UserState = {
  profile: undefined,
  loading: { profile: false },
  disclaimer: false,
};

export interface User {
  id: string;
  name: string;
  role: 'manager' | 'employee';
}

/* Achievement State */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  status: string;
  reminder: string,
  createdBy: string; 
  assignedTo: string; 
}

export interface AchievementToCreate {
  title: string;
  description: string;
  status: string;
  reminder: string,
  createdBy: undefined | string; 
  assignedTo: string; 
}

export interface AchievementState {
  achievements: Achievement[];
  selectedAchievement: Achievement | null;
  loading: boolean;
  error: any;
}

export const initialState: AchievementState = {
  achievements: [],
  selectedAchievement: null,
  loading: false,
  error: null
};