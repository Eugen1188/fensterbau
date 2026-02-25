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
    ['img/windowref2_before.jpeg', 'img/windowref2_after.jpeg'],
    ['img/windowref_before.jpeg', 'img/windowref_after.jpeg'],
    ['img/garage.jpeg'],
    ['img/slidingdoor.jpeg'],
    ['img/door-ref.jpeg'],
  ];

  currentIndex = 0;
  touchStartX = 0;
  touchEndX = 0;
  swipeThreshold = 50;

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
