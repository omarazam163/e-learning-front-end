import { Component, Input } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [SidebarComponent , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isMobile : boolean =  window.innerWidth < 1024 ? true : false ;
  showSidebar : boolean = false;

  constructor ( public detailsService : DetailsService ) {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024) {
        this.isMobile = true;
      }else {
        this.isMobile = false;
      }
    });
  }

  imagePath = "https://th.bing.com/th/id/OIP.YIre5HGHiqBa7DCmrF4KwwHaJQ?rs=1&pid=ImgDetMain";

  @Input() title! : string ;


}
