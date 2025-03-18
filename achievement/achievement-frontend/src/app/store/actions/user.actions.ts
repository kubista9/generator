import { createAction, props } from '@ngrx/store';
import { Profile } from '@depsit/chattypes';
import { MsalService } from '@azure/msal-angular';

export const loadProfile = createAction('[User] load profile');

export const unloadProfile = createAction(
  '[User] unload profile',
  (service?: () => MsalService) => ({ service })
);

export const profileLoading = createAction('[User] user loading');

export const profileLoaded = createAction(
  '[User] profile loaded success',
  props<{ profile: Profile }>()
);
export const profileUnLoaded = createAction('[User] remove profile');

export const getDisclaimer = createAction('[User] get disclaimer');

export const disclaimerLoaded = createAction(
  '[User] disclaimer loaded',
  props<{ disclaimer: boolean }>()
);
