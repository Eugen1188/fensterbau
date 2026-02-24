import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ReferencesComponent } from "./references/references.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AboutUsComponent, ReferencesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fensterbau';
}
