export interface AppConfig {
  productName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  defaultCountry: string;
  defaultLocale: string;
}

export const appConfig: AppConfig = {
  productName: 'EduSuite AI',
  version: '0.5.0',
  environment: import.meta.env.PROD ? 'production' : 'development',
  defaultCountry: 'CL',
  defaultLocale: 'es-CL',
};
