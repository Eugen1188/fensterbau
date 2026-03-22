import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private baseUrl = 'https://www.info-jh.team';

  constructor() {}

  /**
   * Erstellt und injiziert JSON-LD Schema für LocalBusiness
   */
  createLocalBusinessSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': this.baseUrl,
      name: 'Info JH',
      description: 'Fachgerechte Fenster- und Türenmontage mit marktführenden Kunststoff-, Aluminium- und Holzfenstern.',
      url: this.baseUrl,
      image: `${this.baseUrl}/assets/img/header_desktop.avif`,
      telephone: '+49 163 7657673',
      email: 'kontakt@info-jh.team',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rheinhausen',
        addressLocality: 'Oberhausen',
        postalCode: '46045',
        addressCountry: 'DE',
        addressRegion: 'Nordrhein-Westfalen'
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Oberhausen'
        },
        {
          '@type': 'City',
          name: 'Rheinhausen'
        }
      ],
      sameAs: [
        'https://www.facebook.com/fensterbau-rheinhausen',
        'https://www.instagram.com/fensterbau-rheinhausen'
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      },
      priceRange: '$$',
      name_de: 'Fensterbau Rheinhausen',
      knowsAbout: [
        'Kunststofffenster',
        'Aluminiumfenster',
        'Holzfenster',
        'Haustüren',
        'Schiebetüren',
        'Fensterservice',
        'Fensterberatung',
        'Fenstermontage',
        'Türenmontage'
      ]
    };

    this.injectSchema(schema);
  }

  /**
   * Erstellt und injiziert JSON-LD Schema für Organization
   */
  createOrganizationSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Info JH',
      url: this.baseUrl,
      logo: `${this.baseUrl}/assets/img/header_desktop.avif`,
      description: 'Professionelle Fenster- und Türenmontage.',
      sameAs: [
        'https://www.facebook.com/fensterbau-rheinhausen',
        'https://www.instagram.com/fensterbau-rheinhausen'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        telephone: '+49 163 7657673',
        email: 'kontakt@info-jh.team'
      }
    };

    this.injectSchema(schema);
  }

  /**
   * Erstellt und injiziert BreadcrumbList Schema für Navigation
   */
  createBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): void {
    const items = breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }));

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    };

    this.injectSchema(schema);
  }

  /**
   * Erstellt und injiziert Product Schema für Fenster
   */
  createProductSchema(name: string, description: string, image: string): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: name,
      description: description,
      image: image,
      brand: {
        '@type': 'Brand',
        name: 'Marktführende Fenster von Schüco, Rehau, Salamander'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '25'
      }
    };

    this.injectSchema(schema);
  }

  /**
   * Erstellt und injiziert Review Schema
   */
  createReviewSchema(title: string, reviewBody: string, ratingValue: number, authorName: string): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: ratingValue.toString(),
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: reviewBody,
      author: {
        '@type': 'Person',
        name: authorName
      }
    };

    this.injectSchema(schema);
  }

  /**
   * Hilfsfunktion zum Injizieren von Schema-Tags
   */
  private injectSchema(schema: any): void {
    // Entferne alte Schema-Tags desselben Typs
    const schemaType = schema['@type'];
    const existingSchemas = document.querySelectorAll(
      `script[type="application/ld+json"][data-schema-type="${schemaType}"]`
    );
    existingSchemas.forEach(script => script.remove());

    // Erstelle neues Schema-Tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema-type', schemaType);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /**
   * Erstellt FAQPage Schema
   */
  createFAQSchema(faqs: Array<{ question: string; answer: string }>): void {
    const mainEntity = faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }));

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: mainEntity
    };

    this.injectSchema(schema);
  }
}
