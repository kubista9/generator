import { createReducer, on } from '@ngrx/store';
import { initialUserState } from '../state';
import {
  disclaimerLoaded,
  loadProfile,
  profileLoaded,
  profileLoading,
  profileUnLoaded,
} from '../actions/user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(loadProfile, (state) => {
    state = {
      ...state,
      profile: undefined,
      loading: { ...state.loading, profile: false },
    };
    return state;
  }),
  on(profileLoading, (state) => {
    state = { ...state, loading: { ...state.loading, profile: true } };
    return state;
  }),
  on(profileLoaded, (state, parameters) => {
    state = {
      ...state,
      profile: parameters.profile,
      loading: { ...state.loading, profile: false },
    };
    return state;
  }),
  on(profileUnLoaded, (state) => {
    state = {
      ...state,
      profile: undefined,
      loading: { ...state.loading, profile: false },
    };
    return state;
  }),
  on(disclaimerLoaded, (state, parameters) => {
    state = { ...state, disclaimer: parameters.disclaimer };
    return state;
  })
);