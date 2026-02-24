import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-references',
  imports: [CommonModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  slides = [
    ['img/door-ref.jpeg'],
    ['img/garage.jpeg'],
    ['img/slidingdoor.jpeg'],
    ['img/windowref_before.jpeg', 'img/windowref_after.jpeg'],
    ['img/windowref2_before.jpeg', 'img/windowref2_after.jpeg'],
  ];

  currentIndex = 0;

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
}
