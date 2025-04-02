export interface ServiceType {
  type: 'smallMove' | 'homeMove' | 'officeMove';
}

export interface EstimateStatus {
  type: 'general' | 'assigned' | 'rejected';
}

export interface EstimateRequestStatus {
  type: 'active' | 'inactive' | 'confirmed';
}

export interface AreaType {
  seoul: '서울';
  gyeonggi: '경기';
  incheon: '인천';
  gangwon: '강원';
  chungbuk: '충북';
  chungnam: '충남';
  sejong: '세종';
  daejeon: '대전';
  jeonbuk: '전북';
  jeonnam: '전남';
  gwangju: '광주';
  gyeongbuk: '경북';
  gyeongnam: '경남';
  daegu: '대구';
  ulsan: '울산';
  busan: '부산';
  jeju: '제주';
}

export interface Driver {
  id: string;
  profileImage: string;
  nickname: string;
  experience: number;
  summary: string;
  description: string;
  services: ServiceType;
  serviceAreas: Partial<AreaType>;
}

export interface DriverWithMeta extends Driver {
  countCompleteMoving: number;
  isLiked: boolean;
  countLike: number;
}
