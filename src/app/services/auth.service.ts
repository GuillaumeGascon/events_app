import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { NavController } from '@ionic/angular';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { authEndpoints } from '../endpoints/auth.endpoint';
import { storage } from '../helpers/storage';
import { User } from '../models/user';
import { UserService } from './user.service';

export enum error {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  BAD_CREDENTIAL = 'BAD_CREDENTIAL',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  USERNAME_ALREADY_EXIST = 'USERNAME_ALREADY_EXIST',
  ACCESS_DENIED = 'ACCESS_DENIED',
  BAD_REFRESH_TOKEN = 'BAD_REFRESH_TOKEN',
  ERROR_DEFAULT = 'ERROR_DEFAULT'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly REFRESH_TOKEN = 'refreshToken';

  private token: string | null = null;
  private loggedInChanged = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
  ) {}

  login(email: string, hash: string): Promise<any> {
    const login = this.http.post<any>(authEndpoints.login(), {
      email,
      hash
    })
    .pipe(map(async result => {
      console.log(result);
      if (result?.access_token || result?.refresh_token) {
        await storage.set(
          AuthService.REFRESH_TOKEN,
          {
            accessToken: result?.access_token,
            refreshToken: result?.refresh_token,
          }
        );
        this.token = result?.access_token;
        this.loggedInChanged.next(true);
      } else {
        this.token = null;
      }
      return result;
    }));
    return firstValueFrom(login);
  }

  register(user: User): Promise<any | null> {
    const register = this.http.post<any>(authEndpoints.register(), user)
    .pipe(map(async () => {
      if (user && user.email && user.hash) {
        return await this.login(user.email, user.hash);
      }
    }));
    return firstValueFrom(register);
  }

  async refreshToken(): Promise<any> {
    const data = await storage.get(AuthService.REFRESH_TOKEN);
    const userId = await storage.get(UserService.USER_ID);
    const user = {
      refreshToken: data.refreshToken,
      id: userId,
    }
    const token = this.http.post<any>(authEndpoints.token(), user)
      .pipe(map(async result => {
        await storage.set(
          AuthService.REFRESH_TOKEN,
          {
            accessToken: result?.access_token,
            refreshToken: result?.refresh_token,
            id: user.id
          }
        );
        this.token = result?.access_token;
        this.loggedInChanged.next(true);
        return result;
      }));
    return firstValueFrom(token);
  }

  async clearRefreshToken(): Promise<boolean> {
    try {
      if (await storage.keyExists(AuthService.REFRESH_TOKEN)) {
        return await storage.remove(AuthService.REFRESH_TOKEN);
      }
    } catch (err) {
      console.error(err);
    }
    return true;
  }

  async logout(): Promise<void> {
    this.loggedInChanged.next(false);
    this.token = null;
    await this.clearRefreshToken();
    await this.navCtrl.navigateRoot(['/onboarding']);
  }

  async sendVerificationCode(email: string, code: string): Promise<any> {
    try {
      const mailer = await this.http.post<any>(authEndpoints.verificationCode(), {
        email,
        code
      });
      return await firstValueFrom(mailer);
    } catch (err) {
      console.error(err);
    }
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  loggedInChange(): Observable<boolean> {
    return this.loggedInChanged.asObservable();
  }

  getToken(): string | null {
    return this.token;
  }

}
