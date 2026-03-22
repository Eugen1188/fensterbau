import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Über Uns - Fenster & Türen | Info JH',
      description: 'Erfahren Sie mehr über unsere Expertise in der Fenster- und Türenmontage.',
      keywords: 'Über uns, Fensterservice, Türenmontage, Beratung',
      url: 'https://www.info-jh.team/#about'
    });
  }
}
