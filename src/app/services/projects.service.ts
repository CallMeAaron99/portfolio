import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interface/projects.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  getProjects$ = this.http.get<Project[]>('assets/json/projects.json');

  constructor(private http: HttpClient) { }

}