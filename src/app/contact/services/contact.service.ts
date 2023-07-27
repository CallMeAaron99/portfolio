import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contact } from '../../interface/contact.interface';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendEmail(data: contact): Observable<any> {
    return this.http.post('email', data);
  }
}
