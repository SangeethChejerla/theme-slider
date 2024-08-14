export type LIGHT_DARK_MODE = 'light' | 'dark';

export type SiteConfig = {
  title: string;
  subtitle: string;
  lang: string;
  themeColor: {
    hue: number;
    fixed: boolean;
  };
};
