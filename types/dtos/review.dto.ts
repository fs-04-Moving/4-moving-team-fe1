import {DriverWithMeta} from "@/types/move.type"

export interface Review {
  id: string;
  serviceType: string;
  profileImage: string;
  nickname: string;
  movingDate: string;
  price: number;
  content: string;
  createdAt: string;
  rating: number;
  isReviewWritten: boolean;
  onClickWriteReview?: () => void;
  driver?: DriverWithMeta;
  estimateId?: string; 
}

export interface CreateReviewParams {
  estimateId: string;
  content: string;
  rating: number;
}