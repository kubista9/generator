import { HttpClient } from '@angular/common/http';
import { Achievement } from '../../store/state';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AchievementToCreate } from '../../store/state';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AchievementService {
  private apiUrl! : string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    configService.whenReady(() => {
      this.apiUrl = this.configService.getConfig().apiUrl + '/achievements';
    });
  }

  getAchievements(): Observable<Achievement[]> {
    if (!this.apiUrl) {
      console.error("API URL is not initialized.");
      return of([]);
    }
  
    console.log('Fetching achievements from:', this.apiUrl);
  
    return this.http.get<{ achievements: Achievement[] }>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching achievements:', error);
        return of({ achievements: [] });
      }),
      map((response: { achievements: Achievement[] }) => response.achievements)
    );
  }

  createAchievement(achievement: AchievementToCreate): Observable<any> {
    if (!this.apiUrl) {
      console.error("API URL is not initialized.");
      return of(null);
    }

    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.post<Achievement>(this.apiUrl, achievement, { headers });
  }

  deleteAchievement(id: string): Observable<void> {
    if (!this.apiUrl) {
      console.error("API URL is not initialized.");
      return of(void 0);
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting achievement:', error);
        throw error;
      })
    );
  }

  updateAchievement(updatedAchievement: Achievement): Observable<Achievement> {
    return this.http.put<Achievement>(`${this.apiUrl}/${updatedAchievement.id}`, updatedAchievement);
  }  

  getAchievementById(id: string): Observable<Achievement> {
    if (!this.apiUrl) {
      console.error("API URL is not initialized.");
      return of() as Observable<Achievement>;
    }

    return this.http.get<Achievement>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching achievement details:', error);
        throw error;
      })
    );
  }

  updateAchievementStatus(id: string, status: 'approved' | 'rejected'): Observable<void> {
    if (!this.apiUrl) {
      console.error("API URL is not initialized.");
      return of(void 0);
    }
  
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(error => {
        console.error('Error updating achievement status:', error);
        throw error;
      })
    );
  }
}