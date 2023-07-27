import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authorInfo } from '../interface/authorInfo.interface';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorInfoService {

  getAuthorInfo$ = this.http.get<authorInfo>('assets/json/authorInfo.json').pipe(shareReplay(1));

  constructor(private http: HttpClient) { }

}
