import { Component, OnInit } from '@angular/core';
import { AboutUsComponent } from "../about-us/about-us.component";
import { ReferencesComponent } from "../references/references.component";
import { ContactComponent } from "../contact/contact.component";
import { BenefitsComponent } from "../benefits/benefits.component";
import { MetaService } from '../services/meta.service';
import { SchemaService } from '../services/schema.service';

@Component({
  selector: 'app-home',
  imports: [AboutUsComponent, ReferencesComponent, ContactComponent, BenefitsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private metaService: MetaService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Fenster & Türen Montage | Info JH',
      description: 'Professionelle Fenster- und Türenmontage. Kunststoff-, Aluminium- und Holzfenster mit Beratung und Montage vor Ort.',
      keywords: 'Fenster Montage, Türen Montage, Fensterbau, Kunststofffenster, Aluminiumfenster, Holzfenster, Fensterservice',
      url: 'https://www.info-jh.team/'
    });

    // Injiziere Schema.org Strukturdaten
    this.schemaService.createLocalBusinessSchema();
    this.schemaService.createOrganizationSchema();
    this.schemaService.createBreadcrumbSchema([
      { name: 'Home', url: 'https://www.info-jh.team/' }
    ]);
  }
}
