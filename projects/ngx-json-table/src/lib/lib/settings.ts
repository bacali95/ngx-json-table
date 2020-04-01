export interface Settings {
  headers?: HeadSettings;
  body?: BodySettings;
}

export interface HeadSettings {
  key?: {
    text?: string;
    width?: string;
    sort?: boolean;
    sortDirection?: SortType;
  };
  value?: {
    text?: string;
    width?: string;
  };
}

export interface BodySettings {
  value?: string;
}

export type SortType = 'asc' | 'desc';
