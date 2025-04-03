import { EstimateStatus, ServiceType } from '../move.type';

export interface Estimate {
  id: string;
  price: number;
  serviceType: ServiceType;
  status: EstimateStatus;
  customerName: string;
  workerProfileImage: string;
  workerSummary: string;
  workerNickname: string;
  workerFavoritesCount: number;
  workerReviewsCount: number;
  workerRating: number;
  workerExperience: number;
  workerConfirmedEstimatesCount: number;
  movingDate: Date;
  departure: string;
  destination: string;
  requestDate: Date;
}
