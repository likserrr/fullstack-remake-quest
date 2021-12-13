import { AnyCategory, StoreCategory } from '../models/posts/ICategory';

export function categoryEnum(category: string): StoreCategory {
  switch (category) {
    case 'best':
      return { category: AnyCategory.best, page: 1 };
    case 'singles':
      return { category: AnyCategory.singles, page: 1 };
    case 'beatiful':
      return { category: AnyCategory.beatiful, page: 1 };
    case 'software':
      return { category: AnyCategory.software, page: 1 };
    case 'another':
      return { category: AnyCategory.another, page: 1 };

    default:
      return { category: AnyCategory.all };
  }
}
