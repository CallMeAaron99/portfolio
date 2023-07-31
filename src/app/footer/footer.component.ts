import { Component } from '@angular/core';
import authorInfoJson from '../../assets/json/authorInfo.json';
import { authorInfo } from '../interface/authorInfo.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  authorInfo: authorInfo = authorInfoJson;
  
}
