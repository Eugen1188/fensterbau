import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface MetaTagConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private baseUrl = 'https://www.info-jh.team';
  private defaultImage = 'https://www.info-jh.team/assets/img/header_desktop.avif';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * Setzt alle Meta-Tags für eine Seite
   * @param config MetaTagConfig mit title, description, keywords, etc.
   */
  setMetaTags(config: MetaTagConfig): void {
    const config_with_defaults = {
      image: this.defaultImage,
      type: 'website',
      url: this.baseUrl,
      ...config
    };

    // Title
    if (config_with_defaults.title) {
      this.titleService.setTitle(config_with_defaults.title);
    }

    // Meta description
    if (config_with_defaults.description) {
      this.updateMetaTag('description', config_with_defaults.description);
    }

    // Meta keywords
    if (config_with_defaults.keywords) {
      this.updateMetaTag('keywords', config_with_defaults.keywords);
    }

    // Open Graph Tags
    this.updateMetaTag('og:title', config_with_defaults.title || 'Fensterbau Rheinhausen');
    this.updateMetaTag('og:description', config_with_defaults.description || '');
    this.updateMetaTag('og:type', config_with_defaults.type || 'website');
    this.updateMetaTag('og:url', config_with_defaults.url || this.baseUrl);
    this.updateMetaTag('og:image', config_with_defaults.image || this.defaultImage);
    this.updateMetaTag('og:image:type', 'image/avif');
    this.updateMetaTag('og:image:width', '1200');
    this.updateMetaTag('og:image:height', '630');
    this.updateMetaTag('og:locale', 'de_DE');

    // Twitter Card Tags
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', config_with_defaults.title || 'Fensterbau Rheinhausen');
    this.updateMetaTag('twitter:description', config_with_defaults.description || '');
    this.updateMetaTag('twitter:image', config_with_defaults.image || this.defaultImage);

    // Canonical URL
    this.updateCanonicalTag(config_with_defaults.url || this.baseUrl);
  }

  /**
   * Hilfsfunktion zum Aktualisieren von Meta-Tags
   */
  private updateMetaTag(name: string, content: string): void {
    const existingTag = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
    
    if (existingTag) {
      existingTag.setAttribute('content', content);
    } else {
      const tag = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  }

  /**
   * Setzt den Canonical Link
   */
  private updateCanonicalTag(url: string): void {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    
    canonicalTag.setAttribute('href', url);
  }

  /**
   * Setzt Standard Meta-Tags zurück
   */
  resetMetaTags(): void {
    this.setMetaTags({
      title: 'Fenster & Türen Montage | Fensterbau Oberhausen Rheinhausen',
      description: 'Fachgerechte Fenster- und Türenmontage in Oberhausen und Rheinhausen. Kunststoff-, Aluminium- und Holzfenster von Schüco, Rehau, Salamander. Individuelle Beratung und professionelle Montage.',
      keywords: 'Fenster Montage, Türen Montage, Fensterbau, Kunststofffenster, Aluminiumfenster, Holzfenster, Oberhausen, Rheinhausen'
    });
  }
}
