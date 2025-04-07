import { EstimateRequestStatus, ServiceType } from '../move.type';

export interface EstimateRequest {
  id: string;
  requestDate: Date;
  serviceType: ServiceType;
  movingDate: Date;
  destination: string;
  departure: string;
  isAssigned: boolean;
  status: EstimateRequestStatus;
}
