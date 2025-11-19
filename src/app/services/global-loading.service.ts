import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalLoadingService {

  private overlay: HTMLDivElement | null = null;
  private counter = 0;

  show() {
    this.counter++;

    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'global-loading-overlay';
    this.overlay.innerHTML = `
      <div class="loader-box">
        <div class="spinner"></div>
        <p>Carregando...</p>
      </div>
    `;

    document.body.appendChild(this.overlay);
  }

  hide() {
    this.counter--;

    if (this.counter <= 0) {
      this.counter = 0;
      if (this.overlay) {
        this.overlay.remove();
        this.overlay = null;
      }
    }
  }
}
