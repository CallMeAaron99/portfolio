import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<Project[]>('assets/json/projects.json');
  }
}
