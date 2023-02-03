import { environment } from "src/environments/environment";

const imageEndpointPrefix = `${environment.apiUrl}/image`;
const withPrefix = (endpoint: string) => `${imageEndpointPrefix}${endpoint}`;

export const imageEndpoints = {
  create: ()                                 => withPrefix(''),
  get: ()                                    => withPrefix(''),
  getById: (id: number)                      => withPrefix(`/${id}`),
}
