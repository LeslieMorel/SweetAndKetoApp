import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttachDocumentsValidator } from '../models/validFilesType.model';

@Injectable({
  providedIn: 'root',
})
export class AzureStorageService {
  constructor(private http: HttpClient) {}

  GetImages() {
    return this.http.get('AzureStorage');
  }

  PostImage(file: File) {
    const formData = new FormData();
    formData.append('formFile', file);
    return this.http.post('AzureStorage', formData);
  }
  DeleteImage(fileName: string) {
    return this.http.delete(`AzureStorage/${fileName}`);
  }
}
