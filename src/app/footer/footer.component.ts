import { Component, SkipSelf } from '@angular/core';
import { AuthorInfoService } from '../services/author-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  authorInfo$ = this.authorInfoService.getAuthorInfo$;
  
  constructor(@SkipSelf() private authorInfoService: AuthorInfoService) { }

}
