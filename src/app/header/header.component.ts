import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showMenu = false;
  contactChoice = false;

  showMenuToggle() {
    this.showMenu = !this.showMenu;
  }

  showContactChoiceToggle() {
    this.contactChoice = !this.contactChoice;
  }

  closeAll() {
  this.showMenu = false;
  this.contactChoice = false;
}
}
