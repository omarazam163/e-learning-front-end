import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsService } from '../../../core/services/details.service';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  [x: string]: any;

  constructor(public detailsService: DetailsService) {}

  activeProfileSetting: string = 'personalDetails';
  handleActiveLink(active: string) {
    this.activeProfileSetting = active;
  }

  submitChanges(form: any) {
    this.detailsService.saveChanges(form.value);
    console.log(this.detailsService.notifications);
  }
}
