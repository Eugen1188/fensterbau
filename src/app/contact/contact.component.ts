import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  loading = false;
  successMessage = false;
  formError = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private metaService: MetaService,
  ) {
    this.contactForm = this.fb.group({
      salutation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      street: [''],
      houseNumber: [''],
      zip: [''],
      city: [''],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Kontakt & Angebot | Info JH',
      description: 'Kontaktieren Sie uns für eine kostenlose Beratung und Fenster-Angebot.',
      keywords: 'Kontakt, Fenster Angebot, Beratung, Kontaktformular, Fenster anfrage',
      url: 'https://www.info-jh.team/#contact'
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit() {
    this.formError = false;
    this.successMessage = false;

    if (this.contactForm.invalid) {
      this.formError = true;
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = {
      email: this.contactForm.value.email,
      name: `${this.contactForm.value.salutation} ${this.contactForm.value.firstName} ${this.contactForm.value.lastName}`,
      message: `
Telefon: ${this.contactForm.value.phone}

Adresse:
${this.contactForm.value.street} ${this.contactForm.value.houseNumber}
${this.contactForm.value.zip} ${this.contactForm.value.city}

Nachricht:
${this.contactForm.value.message}
`,
    };

    this.http.post('/mail/sendmail.php', formData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = true;
        this.contactForm.reset();
      },
      error: () => {
        this.loading = false;
        this.formError = true;
      },
    });
  }
}
