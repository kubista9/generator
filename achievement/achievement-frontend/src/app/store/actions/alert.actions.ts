import { createAction, props } from '@ngrx/store';
import { Alert } from '@depsit/chattypes';

export const pushAlert = createAction(
  '[Alert] push alert',
  props<{ alert: Alert }>()
);

export const clearAlert = createAction('[Alert] clear alert');
