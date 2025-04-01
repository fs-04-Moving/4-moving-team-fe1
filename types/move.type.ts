export interface MovingType {
  type: 'smallMove' | 'homeMove' | 'officeMove';
}

export interface EstimateStatus {
  type: 'general' | 'assigned' | 'rejected';
}

export interface EstimateRequestStatus {
  type: 'active' | 'inactive' | 'confirmed';
}
