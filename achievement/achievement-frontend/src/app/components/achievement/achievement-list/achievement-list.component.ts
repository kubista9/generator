import { Component, Input,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Achievement } from '../../../store/state';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AchievementActions from '../../../store/actions/achievements.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-achievements-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AchievementsListComponent {
  @Input() role: 'employee' | 'manager' = 'employee';
  @Input() achievements$!: Observable<Achievement[]>;
  @Input() loading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  deleteAchievement(id: string) {
    if (confirm('Are you sure you want to delete this achievement?')) {
      this.store.dispatch(AchievementActions.deleteAchievement({ id }));
    }
  }

  viewAchievementDetails(id: string) {
    this.router.navigate(['/achievements', id]);
  }

  approveAchievement(achievement: Achievement) {
    this.store.dispatch(AchievementActions.updateAchievementStatus({ 
      id: achievement.id, 
      status: 'approved' 
    }));
  }
  
  rejectAchievement(achievement: Achievement) {
    this.store.dispatch(AchievementActions.updateAchievementStatus({ 
      id: achievement.id, 
      status: 'rejected' 
    }));
  }
}