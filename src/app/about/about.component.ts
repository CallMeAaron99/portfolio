import { Component, SkipSelf } from '@angular/core';
import { SkillsService } from '../services/skills.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  skills$ = this.skillsService.getSkills$;

  constructor(@SkipSelf() private skillsService: SkillsService) { }

}
