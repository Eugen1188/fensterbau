import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

contactForm: FormGroup;

  loading = false;
  successMessage = false;
  formError = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
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
      name: `${this.contactForm.value.firstName} ${this.contactForm.value.lastName}`,
      message: this.contactForm.value.message
    };

    this.http.post('assets/sendmail.php', formData)
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = true;
          this.contactForm.reset();
        },
        error: () => {
          this.loading = false;
          this.formError = true;
        }
      });
  }

}
