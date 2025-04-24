export interface Worker {
  id: number;
  workerId: number;
  profileImage: string;
  experience: number;
  nickname: string;
  services: string[];
  serviceAreas: string[];
  reviewsCount: number;
  favoritesCount: number;
  reviewsAverage: number;
  confirmedEstimateCount: number;
  isFavorite: boolean;
  summary: string;
}

export interface WorkerSearchParams {
  serviceArea?: string;
  serviceType?: string;
  orderBy?: string;
  page?: number;
  pageSize?: number;
}

export interface WorkerPage {
  list: Worker[];
  totalCount: number;
}
