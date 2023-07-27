import { Component, SkipSelf } from '@angular/core';
import { AuthorInfoService } from '../services/author-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  authorInfo$ = this.authorInfoService.getAuthorInfo$;
  
  constructor(@SkipSelf() private authorInfoService: AuthorInfoService) { }
  
}
