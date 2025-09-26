import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastrar-sensor',
  templateUrl: './cadastrar-sensor.page.html',
  styleUrls: ['./cadastrar-sensor.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CadastrarSensorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
