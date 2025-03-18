import { Configuration } from './config.types';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private config!: Configuration;
  private actions: Function[] = [];
  ready: boolean = false;

  public async init(): Promise<void> {
    const response = await fetch('../../../../assets/config.json');
    const data = await response.json();
    this.config = data;
    this.ready = true;
    this.actions.forEach((action) => action.call(this));
  }

  public getConfig(): Configuration {
    return this.config;
  }

  whenReady(action: Function) {
    if (this.ready) {
      action.call(this);
    } else {
      this.actions.push(action);
    }
  }
}
