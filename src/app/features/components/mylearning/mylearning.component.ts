import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mylearning',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './mylearning.component.html',
  styleUrl: './mylearning.component.scss',
})
export class MylearningComponent {
  isMobile!: boolean;
  showSidebar: boolean = false;
  platformId = inject(PLATFORM_ID);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 1024;
      window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    }
  }
  toggleSidebar(){
    console.log("here");
    this.showSidebar = !this.showSidebar
  }
  imagePath =
    'https://th.bing.com/th/id/OIP.YIre5HGHiqBa7DCmrF4KwwHaJQ?rs=1&pid=ImgDetMain';
}
