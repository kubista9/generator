import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AchievementService } from '../../services/achievement/achievement.service';
import * as AchievementActions from '../actions/achievements.actions';

@Injectable()
export class AchievementEffects {
  loadAchievements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.loadAchievements),
      mergeMap(() =>
        this.achievementService.getAchievements().pipe(
          map(achievements => AchievementActions.loadAchievementsSuccess({ achievements })),
          catchError(error => of(AchievementActions.loadAchievementsFailure({ error })))
        )
      )
    )
  );

  deleteAchievement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.deleteAchievement),
      mergeMap(({ id }) =>
        this.achievementService.deleteAchievement(id).pipe(
          map(() => AchievementActions.deleteAchievementSuccess({ id })),
          catchError(error => of(AchievementActions.deleteAchievementFailure({ error })))
        )
      )
    )
  );

  loadAchievementDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.loadAchievementDetails),
      mergeMap(({ id }) =>
        this.achievementService.getAchievementById(id).pipe(
          map(achievement => AchievementActions.loadAchievementDetailsSuccess({ achievement })),
          catchError(error => of(AchievementActions.loadAchievementDetailsFailure({ error })))
        )
      )
    )
  );

  updateAchievement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.updateAchievement),
      mergeMap(({ achievement }) =>
        this.achievementService.updateAchievement(achievement).pipe(
          map(updatedAchievement => AchievementActions.updateAchievementSuccess({ achievement: updatedAchievement })),
          catchError(error => of(AchievementActions.updateAchievementFailure({ error })))
        )
      )
    )
  );

  createAchievement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.createAchievement),
      mergeMap(({ achievement }) =>
        this.achievementService.createAchievement(achievement).pipe(
          map(createdAchievement => AchievementActions.createAchievementSuccess({ achievement: createdAchievement })),
          catchError(error => of(AchievementActions.createAchievementFailure({ error })))
        )
      )
    )
  );

  updateAchievementStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AchievementActions.updateAchievementStatus),
      mergeMap(({ id, status }) =>
        this.achievementService.updateAchievementStatus(id, status).pipe(
          map(() => AchievementActions.updateAchievementStatusSuccess({ id, status })),
          catchError(error => of(AchievementActions.updateAchievementStatusFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private achievementService: AchievementService
  ) {}
}