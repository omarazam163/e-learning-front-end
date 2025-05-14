import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LinksService } from '../../../core/services/links.service';
import { Router, RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(public linksService: LinksService, public router: Router) {}
}
