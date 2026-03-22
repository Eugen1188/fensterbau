import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-references',
  imports: [CommonModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Referenzen & Projekte | Info JH',
      description: 'Sehen Sie unsere erfolgreichen Fenster- und Türenmontage-Projekte mit Vorher-Nachher Beispielen.',
      keywords: 'Fenster Referenzen, Projekte, Kundenprojekte, Vorher-Nachher, Fensterarbeiten, Montage Beispiele',
      url: 'https://www.info-jh.team/#references'
    });
  }
  slides = [
    ['img/windowref2_before.jpeg', 'img/windowref2_after.jpeg'],
    ['img/windowref_before.jpeg', 'img/windowref_after.jpeg'],
    ['img/garage.jpeg'],
    ['img/slidingdoor.jpeg'],
    ['img/door-ref.jpeg'],
  ];

  private imageAltTexts: { [key: string]: string } = {
    'img/windowref2_before.jpeg': 'Fensterinstallation - Vorher',
    'img/windowref2_after.jpeg': 'Fensterinstallation - Nachher',
    'img/windowref_before.jpeg': 'Fensterrenovierung - Vorher',
    'img/windowref_after.jpeg': 'Fensterrenovierung - Nachher',
    'img/garage.jpeg': 'Garagentor und Fenster Montage Projekt',
    'img/slidingdoor.jpeg': 'Schiebetür Installation in Rheinhausen',
    'img/door-ref.jpeg': 'Hauseingang mit neuen Türen'
  };

  currentIndex = 0;
  touchStartX = 0;
  touchEndX = 0;
  swipeThreshold = 50;

  /**
   * Gibt beschreibenden Alt-Text für Bilder zurück
   */
  getImageAlt(imagePath: string): string {
    return this.imageAltTexts[imagePath] || 'Fenster- und Türenmontage Referenz';
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  back() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.slides.length - 1;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const distance = this.touchEndX - this.touchStartX;

    if (distance > this.swipeThreshold) {
      this.back();
    } else if (distance < -this.swipeThreshold) {
      this.next();
    }
  }
}
