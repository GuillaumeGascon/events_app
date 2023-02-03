import { environment } from "src/environments/environment";

const usersEndpointPrefix = `${environment.apiUrl}/users`;
const withPrefix = (endpoint: string) => `${usersEndpointPrefix}${endpoint}`;

export const usersEndpoints = {
  me: ()                                 => withPrefix('/me'),
}
