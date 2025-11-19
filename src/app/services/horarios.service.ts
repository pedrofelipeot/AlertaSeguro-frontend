// horarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  private apiUrl = 'https://alertaseguro-backend.onrender.com/esp/horarios';

  constructor(private http: HttpClient) {}

  getHorarios(userId: string, mac: string): Observable<any[]> {
    const url = `${this.apiUrl}/${userId}/${mac}`;
    console.log('🌍 URL chamada para horários:', url);
    return this.http.get<any[]>(url);
  }
}
