import { EstimateStatus } from "../move.type";

export interface Estimate {
  id: string;
  price: number;
  serviceType: ServiceTypeEng;
  status: EstimateStatus;
  isConfirmed: boolean;
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
  rejectionMessage?: string;
}

export type ServiceTypeKor = "소형이사" | "가정이사" | "사무실이사";
export type ServiceTypeEng = "smallMove" | "homeMove" | "officeMove";

type ServiceType = {
  [name in ServiceTypeEng]: ServiceTypeKor;
};

export const serviceTypeObject: ServiceType = {
  smallMove: "소형이사",
  homeMove: "가정이사",
  officeMove: "사무실이사",
};

export const serviceTypeDetailObject = {
  smallMove: "소형이사 (원룸, 투룸, 20평대 미만)",
  homeMove: "가정이사 (쓰리룸, 20평대 이상)",
  officeMove: "사무실이사(사무실, 상업공간)",
};
