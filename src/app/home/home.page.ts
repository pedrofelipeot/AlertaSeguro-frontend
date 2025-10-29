import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // importa todos os componentes do Ionic que você usar
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // importantíssimo!
  imports: [IonicModule, CommonModule, RouterModule], // 🔹 aqui entram todos os módulos usados no template
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {}
