import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Datenschutz | Info JH',
      description: 'Datenschutzerklärung von Info JH. Informationen zum Schutz Ihrer persönlichen Daten.',
      keywords: 'Datenschutz, Datenschutzerklärung, Datenschutzrichtlinie',
      url: 'https://www.info-jh.team/privacy-policy'
    });
  }
}
