import { Component, ElementRef, Input,ViewChild } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('searchBar') searchBar!: ElementRef;
  @ViewChild('mobileMenu') menu!: ElementRef;

  openSearchBar() {
    (this.searchBar.nativeElement as HTMLElement).classList.toggle('hidden');
    (this.menu.nativeElement as HTMLElement).classList.add('hidden');
  }

  openMenu() {
    (this.menu.nativeElement as HTMLElement).classList.toggle('hidden');
    (this.searchBar.nativeElement as HTMLElement).classList.add('hidden');
  }
}
