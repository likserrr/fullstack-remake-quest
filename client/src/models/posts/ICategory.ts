export interface CategoryCount {
  best: number;
  singles: number;
  beatiful: number;
  software: number;
  another: number;
}

export enum AnyCategory {
  all = 'all',
  best = 'best',
  singles = 'singles',
  beatiful = 'beatiful',
  software = 'software',
  another = 'another',
}

export interface StoreCategory {
  category: AnyCategory;
  page?: number;
}
