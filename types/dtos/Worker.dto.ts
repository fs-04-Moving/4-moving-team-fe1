export interface Worker {
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
  //summary
}

export interface WorkerSearchParams {
  serviceArea?: string;
  serviceType?: string;
  orderBy?: string;
  page?: number;
  pageSize?: number;
}
