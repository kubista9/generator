import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { selectProfile } from '../../../store/selectors/user.selectors';
import * as AchievementActions from '../../../store/actions/achievements.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profile } from '@depsit/chattypes';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import '@depsit/uxdevacc-components';

@Component({
  selector: 'app-create-achievement',
  templateUrl: './create-achievement.component.html',
  styleUrls: ['./create-achievement.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CreateAchievementComponent {
  _profile$: Observable<Profile | undefined> | undefined;
  isLoading: boolean = false;
  myGroup: FormGroup;
  statuses =  [
    {
      "id": "completed",
      "label": "Completed"
    },
    { "id": "pending",
      "label": "Pending"
    },
    {
      "id": "rejected",
      "label": "Rejected"
    }    
  ];

  constructor(
    private store: Store,
  ) {
    this._profile$ = this.store.pipe(select(selectProfile));
    this.myGroup = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      status: new FormControl(),
      assignedTo: new FormControl(),
      reminder: new FormControl()
    });
  }

  createAchievement() {
    console.log("My group", this.myGroup.value);
    this.store.dispatch(
      AchievementActions.createAchievement({ 
        achievement: this.myGroup.value 
      })
    ); 
  }
}