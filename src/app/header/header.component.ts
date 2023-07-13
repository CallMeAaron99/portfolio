import { AfterViewInit, Component } from '@angular/core';

declare function themeSwitcher(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    themeSwitcher();
  }

}
