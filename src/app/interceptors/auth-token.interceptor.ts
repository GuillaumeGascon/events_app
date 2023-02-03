import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";

export const noContentTypeHeader = new HttpContextToken(() => false);

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.addAuthToken(req, next)
        .pipe(catchError(err => {
          const checkApi = req.url.startsWith(environment.apiUrl);
          if (checkApi && err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              return this.handleUnauthorizerError(req, next);
            }
          }
          return throwError(() => err);
        }))
  }

  private addAuthToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const checkApi = req.url.startsWith(environment.apiUrl);
    if (checkApi) {
      const token = this.authService.getToken();
      if (token) {
        if (req.context.get(noContentTypeHeader)) {
          req = req.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          req = req.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        }
      }
    }
    return next.handle(req);
  }

  private async handleUnauthorizerError(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    try {
      await this.authService.refreshToken();
    } catch (err) {
      await this.authService.logout();
      const error = throwError(() => err);
      return firstValueFrom(error);
    }
    const intercept = this.intercept(req, next);
    return firstValueFrom(intercept);
  }

}
