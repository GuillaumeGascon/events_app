import { environment } from "src/environments/environment";

const authEndpointPrefix = `${environment.apiUrl}/auth`;
const withPrefix = (endpoint: string) => `${authEndpointPrefix}${endpoint}`;

export const authEndpoints = {
  register: ()                           => withPrefix('/register'),
  login: ()                              => withPrefix('/login'),
  logout: ()                             => withPrefix('/logout'),
  token: ()                              => withPrefix('/refresh-token'),
  verificationCode: ()                   => withPrefix('/verification-code')
}
