import { Component } from '@angular/core';

import linkJson from '../../assets/json/links.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  links = linkJson;
}
