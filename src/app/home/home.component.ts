import { Component } from '@angular/core';
import authorInfoJson from '../../assets/json/authorInfo.json';
import { authorInfo } from '../interface/authorInfo.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  authorInfo: authorInfo = authorInfoJson;
    
}
