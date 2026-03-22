import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Leistungen & Vorteile | Info JH',
      description: 'Entdecken Sie unsere Leistungen: Qualität, Zuverlässigkeit, professionelle Montage.',
      keywords: 'Fenster Leistungen, Montageservice, Fenster Qualität, Kundenservice, Beratung',
      url: 'https://www.info-jh.team/#benefits'
    });
  }
}
