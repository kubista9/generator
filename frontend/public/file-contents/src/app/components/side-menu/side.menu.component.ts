import { selectProfile } from '../../store/selectors/user.selectors';
import { Store, select } from '@ngrx/store';
import { Profile } from '@depsit/chattypes';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['./side.menu.component.scss'],
  standalone: false
})

export class SideMenuComponent {
  _profile$: Observable<Profile | undefined> | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this._profile$ = this.store.pipe(select(selectProfile));
  }
}