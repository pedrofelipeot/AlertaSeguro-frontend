// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  /** Criar usuário */
  async signUp(email: string, password: string, name?: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    if (user) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, {
        name: name || null,
        email,
        createdAt: serverTimestamp()
      });
    }

    return user;
  }

  /** Login */
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  /** Logout */
  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  /** Deletar conta do usuário */
  async deleteMyAccount(password: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user || !user.email) throw new Error('Nenhum usuário logado');

    // Reautenticar
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Deletar doc do Firestore
    const userRef = doc(this.firestore, `users/${user.uid}`);
    await deleteDoc(userRef).catch(() => {});

    // Deletar Auth
    await user.delete();
  }

  /** Observable do usuário logado */
  getUserObservable(): Observable<User | null> {
    return authState(this.auth);
  }

  /** Retorna o userId atual */
  getCurrentUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }
}
