import { EstimateRequestStatus, ServiceType } from "../move.type";
import { Area } from "./user.entity";

export interface EstimateRequest {
  id: string;
  requestDate: Date;
  serviceType: ServiceType;
  movingDate: Date;
  destination: string;
  departure: string; // 한글 주소
  departureArea: Area; // 영문 지역
  isAssigned: boolean;
  status: EstimateRequestStatus;
}
