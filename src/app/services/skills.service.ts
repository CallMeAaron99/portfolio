import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  
  getSkills$ = this.http.get<string[]>('assets/json/skills.json');

  constructor(private http: HttpClient) { }

}
