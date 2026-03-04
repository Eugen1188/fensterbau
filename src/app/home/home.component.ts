import { Component } from '@angular/core';
import { AboutUsComponent } from "../about-us/about-us.component";
import { ReferencesComponent } from "../references/references.component";
import { ContactComponent } from "../contact/contact.component";
import { BenefitsComponent } from "../benefits/benefits.component";

@Component({
  selector: 'app-home',
  imports: [AboutUsComponent, ReferencesComponent, ContactComponent, BenefitsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
