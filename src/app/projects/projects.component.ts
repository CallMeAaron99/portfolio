import { Component } from '@angular/core';
import projectsJson from '../../assets/json/projects.json';
import { Project } from '../interface/projects.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent{

  projects: Project[] = projectsJson;

}
