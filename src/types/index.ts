export * from './translation';

export interface AppConfig {
  show_update_popup: boolean;
  update_popup_redirect_link: string;
  update_popup_subtitle: string;
  update_popup_title: string;
  force_update_version: string;
  chat_limit_symbols: number;
}
