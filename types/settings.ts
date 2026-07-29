export interface Image {
  url: string;
  publicId: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface AnalyticsSettings {
  googleAnalyticsId: string;
  googleTagManagerId?: string;
  googleSearchConsole?: string;
}

export interface Settings {
  _id?: string;

  siteName: string;
  siteDescription: string;

  logo?: Image;
  favicon?: Image;

  contactEmail: string;

  seo: SEOSettings;

  analytics: AnalyticsSettings;
}