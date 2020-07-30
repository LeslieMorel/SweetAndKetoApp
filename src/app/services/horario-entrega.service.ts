import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HorarioEntregaModel } from '../models/horarioEntrega.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioEntregaService {

  constructor(private http: HttpClient) { }

  Get(){
    return this.http.get('HorariosEntrega');
  }
  GetHorario(id: string){
    return this.http.get(`HorariosEntrega/${id}`);
  }
  PostHorario(horario: HorarioEntregaModel){
    return this.http.post(`HorariosEntrega`, horario);
  }
  PuttHorario(id: string, horario: HorarioEntregaModel){
    return this.http.put(`HorariosEntrega/${id}`, horario);
  }
  DeleteHorario(id: string){
    return this.http.get(`HorariosEntrega/${id}`);
  }
}
