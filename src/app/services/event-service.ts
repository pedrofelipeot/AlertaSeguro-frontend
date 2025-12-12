import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private apiUrl = 'https://alertaseguro-backend.onrender.com';

  private selectedMac = new BehaviorSubject<string>('');
  macChanged$ = this.selectedMac.asObservable();

  constructor(private http: HttpClient) {}

  setSelectedMac(mac: string) {
    this.selectedMac.next(mac.toLowerCase().trim());
  }

  getSelectedMac(): string {
    return this.selectedMac.getValue();
  }

  resetSelectedMac() {
    this.selectedMac.next('');
  }

  // 🔥 Buscar eventos corretamente no backend
  getEvents(userId: string, mac: string) {
  const normalizedMac = mac.toLowerCase().trim();
  const encodedMac = encodeURIComponent(normalizedMac);

  const url = `${this.apiUrl}/esp/events/${userId}/${encodedMac}`;
  console.log("🌐 GET:", url);

  return this.http.get<any[]>(url);
}


  // Deletar evento
  async deleteEvent(uid: string, mac: string, eventId: string) {
    const normalizedMac = mac.toLowerCase().trim();
    const encodedMac = encodeURIComponent(normalizedMac);

    // 🔥 ROTA AJUSTADA PARA CONFERIR COM O BACKEND TAMBÉM
    const url = `${this.apiUrl}/users/${uid}/espdevices/${encodedMac}/events/${eventId}`;

    return await this.http.delete(url).toPromise();
  }
}
