import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-impressum',
  imports: [RouterLink],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Impressum | Info JH',
      description: 'Impressum und rechtliche Informationen von Info JH.',
      keywords: 'Impressum, Kontakt, Rechtliches',
      url: 'https://www.info-jh.team/impress'
    });
  }
}
