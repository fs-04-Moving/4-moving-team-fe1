import { EstimateStatus } from '../move.type';
import { Area } from './user.entity';

export interface Estimate {
  workerId: string;
  workerRating: number;
  id: string;
  price: number;
  serviceType: ServiceTypeEng;
  status: EstimateStatus;
  isConfirmed: boolean;
  customerName: string;
  profileImage: string;
  summary: string;
  nickname: string;
  favoritesCount: number;
  reviewsCount: number;
  rating: number;
  experience: number;
  confirmedEstimatesCount: number;
  movingDate: Date;
  departure: string;
  destination: string;
  departureArea: Area;
  requestDate: Date;
  rejectionMessage?: string;
  isFavorite: boolean;
  comment?: string;
}

export type ServiceTypeKor = '소형이사' | '가정이사' | '사무실이사';
export type ServiceTypeEng = 'smallMove' | 'homeMove' | 'officeMove';

type ServiceType = {
  [name in ServiceTypeEng]: ServiceTypeKor;
};

export const serviceTypeObject: ServiceType = {
  smallMove: '소형이사',
  homeMove: '가정이사',
  officeMove: '사무실이사',
};

export const serviceTypeDetailObject = {
  smallMove: '소형이사 (원룸, 투룸, 20평대 미만)',
  homeMove: '가정이사 (쓰리룸, 20평대 이상)',
  officeMove: '사무실이사(사무실, 상업공간)',
};

export interface RawEstimate {
  id: string;
  customerId: string;
  serviceType: string;
  movingDate: string;
  departureAddress: string;
  destination: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  customerName: string;
}
