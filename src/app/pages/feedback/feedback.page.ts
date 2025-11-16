import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, 
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton
  ],
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {

  model = {
    name: '',
    email: '',
    message: ''
  };

  constructor() {}

  submitFeedback() {
    console.log('Feedback enviado:', this.model);
    alert('Obrigado pelo seu feedback!');
    this.model = { name: '', email: '', message: '' };
  }
}
