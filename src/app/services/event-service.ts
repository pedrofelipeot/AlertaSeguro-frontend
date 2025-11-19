import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://alertaseguro-backend.onrender.com';

  constructor(private http: HttpClient) {}

  getEvents(userId: string, mac: string): Observable<any[]> {
    const encodedMac = encodeURIComponent(mac); // encode de caracteres especiais
    const url = `${this.apiUrl}/esp/events/${userId}/${encodedMac}`;
    console.log("🌍 URL chamada:", url);
    return this.http.get<any[]>(url);
  }
}
