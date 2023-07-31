import { Component } from '@angular/core';
import skillsJson from '../../assets/json/skills.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  skills: string[] = skillsJson;

}
