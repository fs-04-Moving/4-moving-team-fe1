export interface Review {
    id: string;
    serviceType: string;
    profileImage: string;
    nickname: string;
    movingDate: string;
    price: number;
    content: string;
    createdAt: Date;
    rating: number;
    isReviewWritten: boolean;
    onClickWriteReview?: () => void;
  }