import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as AchievementActions from '../../../store/actions/achievements.actions';
import { selectSelectedAchievement } from '../../../store/selectors/achievement.selector';
import { Achievement } from '../../../store/state';
import { DpsInputValueAccessor } from '../../dps-input/dps.input.value.accessor';
import { DpsTextareaValueAccessor } from '../../dps-input/dps.textarea.value.accessor';

@Component({
  selector: 'app-achievement-details',
  templateUrl: './achievement-details.component.html',
  styleUrls: ['./achievement-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DpsInputValueAccessor, 
    DpsTextareaValueAccessor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AchievementDetailsComponent implements OnInit {
  achievement$: Observable<Achievement | null>;
  isEditMode = false;
  editedAchievement: Achievement | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.achievement$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (id) {
          this.store.dispatch(AchievementActions.loadAchievementDetails({ id }));
        }
        return this.store.select(selectSelectedAchievement);
      })
    );
  }

  ngOnInit(): void {
    this.achievement$.subscribe();
  }

  enableEditMode(achievement: Achievement) {
    this.isEditMode = true;
    this.editedAchievement = { ...achievement };
  }

  saveChanges() {
    if (this.editedAchievement) {
      this.store.dispatch(AchievementActions.updateAchievement({ 
        achievement: this.editedAchievement 
      }));
      this.isEditMode = false;
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editedAchievement = null;
  }
}