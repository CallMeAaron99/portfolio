import { Component, OnInit, SkipSelf } from '@angular/core';
import { AboutService } from './services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  skills: string[] = [];

  constructor(@SkipSelf() private aboutService: AboutService) { }

  ngOnInit(): void {
    this.aboutService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

}
