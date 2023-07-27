import { Component, SkipSelf } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  projects$ = this.projectService.getProjects$;

  constructor(@SkipSelf() private projectService: ProjectsService) { }

}
