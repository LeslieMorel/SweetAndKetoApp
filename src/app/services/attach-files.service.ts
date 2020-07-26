import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachFilesService {

  constructor(private http: HttpClient) { }

  GetFiles(){
    return this.http.get('AttachFiles');
  }
  GetAzureImages(){
    return this.http.get('AttachFiles/GetAzure');
  }
  // Get File
  GetFile(Id: number) {
    const url = `AttachFiles/Download/${Id}`;
    return this.http.get(url, {responseType: 'arraybuffer' , observe: 'response'});
  }
  GetFileModel(id: number){
    return this.http.get(`AttachFiles/${id}`);
  }
  PostFile(Entity: string, file: File){
    const formData = new FormData();
    formData.append('formFile', file);
    return this.http.post(`AttachFiles?Entity=${Entity}`, formData);
  }
    // DownLoadFile
    DownLoadFile(file: any , contentType: string, fileName: string) {
      console.log('Download');
      console.log(fileName);
      // const blob = new Blob([file], { type: contentType });
      const filex = new File([file], fileName, { type: contentType}) ;
      const url = window.URL.createObjectURL(filex);
      window.open(url, filex.name);
    }
}
