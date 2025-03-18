import { AchievementsListComponent } from '../../components/achievement/achievement-list/achievement-list.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Achievement } from '../../store/state';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AchievementActions from '../../store/actions/achievements.actions';
import { selectAllAchievements, selectAchievementsLoading } from '../../store/selectors/achievement.selector';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, AchievementsListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EmployeeComponent implements OnInit {
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