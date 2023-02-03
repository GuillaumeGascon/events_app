import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { usersEndpoints } from "../endpoints/user.endpoint";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly USER_ID = 'userId';

  constructor(
    private http: HttpClient
  ) {}

  async me(): Promise<User> {
    const me = this.http.get<User>(usersEndpoints.me());
    return await firstValueFrom(me);
  }

}
