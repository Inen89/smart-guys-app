import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://reqres.in/api';
  private apiKey = 'reqres_4a7c9c9f887445a8b507d0c84a61aae0';

  constructor(private http: HttpClient) {}

  // Pobieranie listy użytkowników
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      headers: {
        'X-API-Key': this.apiKey,
      },
    });
  }

  // Dodawanie nowego użytkownika
  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, userData, {
      headers: {
        'X-API-Key': this.apiKey,
      },
    });
  }

  // Edytowanie istniejącego użytkownika
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, userData, {
      headers: {
        'X-API-Key': this.apiKey,
      },
    });
  }

  // Usuwanie użytkownika
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`, {
      headers: {
        'X-API-Key': this.apiKey,
      },
    });
  }
}
