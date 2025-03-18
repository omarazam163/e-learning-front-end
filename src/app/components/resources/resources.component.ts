import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources',
  imports: [NavbarComponent , CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {

  activeCategory:string = "Blog";
  handleActiveCategory( active : string ) {
    this.activeCategory = active;
  }

  blogSites = [ "medium.com", "uxdesign.cc", "uxpin.com", "toptal.com", "uxmag.com", "uxbooth.com", "prototyper.io" ];

  illustrationSites = [ "dribbble.com", "behance.net", "illustration.tools", "icons8.com/illustrations", "undraw.co" ];

  typographySites = [ "fonts.google.com", "dafont.com", "fontpair.co", "typ.io", "fontsquirrel.com" ];

  iconSites = [ "flaticon.com", "icons8.com", "thenounproject.com", "iconfinder.com", "materialdesignicons.com" ];

  imageSites = [ "unsplash.com", "pexels.com", "pixabay.com", "stocksnap.io", "freepik.com" ];

}
