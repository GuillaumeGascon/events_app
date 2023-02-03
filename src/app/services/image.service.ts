import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { imageEndpoints } from "../endpoints/image.endpoint";
import { noContentTypeHeader } from "../interceptors/auth-token.interceptor";
import { Image } from "../models/image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) {}

  async getImages(): Promise<any> {
    const images = this.http.get(imageEndpoints.get());
    return await firstValueFrom(images);
  }

  async getImageById(id: number): Promise<Image> {
    const image = this.http.get<Image>(imageEndpoints.getById(id));
    return await firstValueFrom(image);
  }

  async upload(file: File): Promise<any> {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    const date = Date.now();
    formData.append('file', file, `${file.name.split('.').shift()}.${ext}`);
    formData.append('name', `${date}-${file.name}`);
    const url = this.http.post(imageEndpoints.create(), formData, {
      context: new HttpContext().set(noContentTypeHeader, true),
      reportProgress: true,
      observe: 'events'
    })
      .pipe(map(async (result: any) => {
        return result.body;
      }));
    return firstValueFrom(url);
  }

}
