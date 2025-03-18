import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../store/state';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl! : string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    configService.whenReady(() => {
      this.apiUrl = this.configService.getConfig().apiUrl + '/users';
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserId(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
