import { Alert as AlertMessage, Profile } from '@depsit/chattypes';

/* Error State */

export interface AlertState {
  alerts: AlertMessage[];
  currentAlert?: AlertMessage;
};
  
export const initialAlertState: AlertState = {
  alerts: [],
  currentAlert: undefined,
};

/* User State */

interface UserLoading {
  profile: boolean;
};

export interface UserState {
  profile?: Profile;
  loading: UserLoading;
  disclaimer: boolean;
};
  
export const initialUserState: UserState = {
  profile: undefined,
  loading: { profile: false },
  disclaimer: false,
};