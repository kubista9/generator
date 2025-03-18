import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/api/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ErrorCodes } from '../../enums/error.enums';
import { MsalService } from '@azure/msal-angular';
import { CommonEffects } from './common.effects';
import { Photo } from '../../interfaces/user';
import { Profile } from '@depsit/chattypes';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  disclaimerLoaded,
  getDisclaimer,
  loadProfile,
  profileLoading,
  profileUnLoaded,
  unloadProfile,
} from '../actions/user.actions';

function arrayBufferToBase64(photo: Photo): string | undefined {
  if (photo.buffer.byteLength === 0) {
    return undefined;
  }
  let binary = '';
  let bytes = new Uint8Array(photo.buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${photo.contentType};base64, ${window.btoa(binary)}`;
}

export interface LogoutAction {
  type: '[User] unload profile';
  service: () => MsalService;
}

@Injectable()
export class UserEffects extends CommonEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    protected override store: Store
  ) {
    super(store);
  }

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      switchMap(() => {
        this.store.dispatch(profileLoading());
        return this.userService.profile().pipe(
          map(([rawProfile, photo]) => {
            const profile: Profile = {
              name: rawProfile.displayName || '',
              email: rawProfile.mail || '',
              initial:
                rawProfile.displayName
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('') || '',
              photo: arrayBufferToBase64(photo),
            };

            return {
              type: '[User] profile loaded success',
              profile: profile,
            };
          }),
          catchError((response) => {
            console.error(response);
            this.pushError(
              response,
              'Profile',
              ErrorCodes.PROFILELOAD,
              '[User] profile stop loading'
            );
            return of({ type: '[User] profile load error' });
          })
        );
      })
    )
  );

  unloadprofile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(unloadProfile.type),
        exhaustMap((action: LogoutAction) => {
          this.store.dispatch(profileUnLoaded());
          const service = action.service();
          service.logout();
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  getDisclaimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDisclaimer),
      exhaustMap(() => {
        return this.userService.getDisclaimer().pipe(
          map((disclaimer: boolean) => {
            return disclaimerLoaded({ disclaimer });
          }),
          catchError((response) => {
            console.error(response);
            this.pushError(response, 'Disclaimer', ErrorCodes.DISCLAIMERLOAD);
            return of({ type: '[User] disclaimer load error' });
          })
        );
      })
    )
  );
}