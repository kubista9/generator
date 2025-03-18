import { Observable, catchError, combineLatest, map, of } from 'rxjs';
import { profile as profileData } from '../../mock/mock.data';
import { Photo, RawProfile } from '../../interfaces/user';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url: string | undefined;
  mock: boolean | undefined;
  constructor(private http: HttpClient, private configService: ConfigService) {
    configService.whenReady(() => {
      this.url = this.configService.getConfig().apiGraphUrl;
      const mock = this.configService.getConfig().mock;
      this.mock = mock || false;
    });
  }

  profile(withPhoto: boolean = true): Observable<[RawProfile, Photo]> {
    if (this.mock) {
      return of([profileData, { buffer: new ArrayBuffer(0), contentType: '' }]);
    }
    let photo: Observable<Photo> = of({
      buffer: new ArrayBuffer(0),
      contentType: '',
    });
    const data = this.http.get(`${this.url}/me`);
    if (withPhoto) {
      photo = this.http
        .get(`${this.url}/me/photo/$value`, {
          observe: 'response',
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'image/jpeg' },
        })
        .pipe(
          map((response) => ({
            buffer: response.body as ArrayBuffer,
            contentType: response.headers.get('Content-Type') || '',
          })),
          catchError((error: any) => {
            if (error.status === 404) {
              return of({ buffer: new ArrayBuffer(0), contentType: '' });
            }
            return of({ buffer: new ArrayBuffer(0), contentType: '' });
          })
        );
    }
    return combineLatest([data, photo]);
  }

  getDisclaimer(): Observable<boolean> {
    return this.http.get(`${this.url}/disclaimer`).pipe(
      map((response: any) => {
        return response.disclaimer || false;
      }),
      catchError((_) => {
        return of(false);
      })
    );
  }

  setDisclaimer(): Observable<void> {
    return this.http.post(`${this.url}/disclaimer`, {}).pipe(
      map((_: any) => {
        return;
      }),
      catchError((_) => {
        return of();
      })
    );
  }
}