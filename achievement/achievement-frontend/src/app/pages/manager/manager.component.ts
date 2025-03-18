import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Achievement } from '../../store/state';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AchievementActions from '../../store/actions/achievements.actions';
import { selectAllAchievements, selectAchievementsLoading } from '../../store/selectors/achievement.selector';
import { AchievementsListComponent } from '../../components/achievement/achievement-list/achievement-list.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    AchievementsListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManagerComponent implements OnInit {
  achievements$: Observable<Achievement[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.achievements$ = this.store.select(selectAllAchievements);
    this.loading$ = this.store.select(selectAchievementsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(AchievementActions.loadAchievements());
  }
}
