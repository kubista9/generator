import { ErrorCodes } from '../../enums/error.enums';
import { pushAlert } from '../actions/alert.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export abstract class CommonEffects {
  constructor(protected store: Store) {}

  protected pushError(
    response: any,
    label: string,
    code: ErrorCodes,
    action?: string | undefined
  ) {
    if (action) {
      this.store.dispatch({
        type: action,
      });
    }
    let msg = '';
    if (!response.error && !response.message) {
      msg = response;
    } else {
      if (response.error && response.error.message) {
        msg = `${response.url} (${response.error.statusCode}): ${response.error.message}`;
      } else {
        msg = response.message;
      }
    }
    this.store.dispatch(
      pushAlert({
        alert: {
          label: label,
          code: code,
          message: msg,
          type: 'Error',
        },
      })
    );
  }
}
