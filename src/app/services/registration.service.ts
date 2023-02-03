import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  code: string | null = null;
  email: string | null = null;
  token: string | null = null;
  user: User | null = null;

  getCode(): string | null {
    return this.code;
  }

  getEmail(): string | null {
    return this.email;
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }

  setCode(code: string): void {
    this.code = code;
  }

  setEmail(email: string): void {
    this.email = email;
    this.user = {
      ...this.user,
      email: email
    }
  }

  setPassword(password: string): void {
    this.user = {
      ...this.user,
      hash: password
    }
  }

  setToken(token: string): void {
    this.token = token;
  }

  setUser(user: User): void {
    this.user = {
      ...user,
      ...this.user,
    }
  }

  reset(): void {
    this.code = null;
    this.email = null;
    this.token = null;
    this.user = null;
  }

}
