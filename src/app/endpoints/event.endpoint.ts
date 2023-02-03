import { environment } from "src/environments/environment";

const eventEndpointPrefix = `${environment.apiUrl}/events`;
const withPrefix = (endpoint: string) => `${eventEndpointPrefix}${endpoint}`;

export const eventEndpoints = {
  create: ()                                  => withPrefix(''),
  get: ()                                     => withPrefix(''),
  getById: (id: number)                       => withPrefix(`/${id}`),
  edit: (id: number)                          => withPrefix(`/edit/${id}`),
  upload: ()                                  => withPrefix('/upload'),
  remove: (id: number)                        => withPrefix(`/delete/${id}`)
}
