interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: Array<string>;
  publishedDate: string;
  industryIdentifiers: Array<{type: string, identifier: string}>;
  pageCount: number;
  maturityRating: string;
  imageLinks: {smallThumbnail: string , thumbnail: string};
  language: string;
  previewLink: string;
  infoLink: string;
}
interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  buyLink: string;
}
export interface BookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: any;
  searchInfo: any;
}
export interface BookResult {
  kind: string;
  totalItems: number;
  items: Array<BookItem>;
}

export interface BookState {
  list: Array<BookItem>;
  totalPages: number;
  currentStartIndex: number;
  maxStartIndex: number;
  pageSize: number;
}
