const ROUTES = {
  HOME: '/',
  LOG_IN: '/auth/log-in', // 로그인
  SIGN_UP: '/auth/sign-up', // 회원가입
  FIND_WORKER: '/find-worker', // 기사님 찾기
  CUSTOMER: {
    ROOT: '/customer', // 견적 요청
    ESTIMATES: {
      ROOT: '/customer/estimates',
      DETAIL: (id: string) => `/customer/estimates/${id}`, // 견적 상세
      PENDING: '/customer/estimates/pending', // 내 견적 관리 - 대기 중인 견적
      RECEIVED: '/customer/estimates/received', // 내 견적 관리 - 받았던 견적
    },
    FAVORITES: '/customer/favorites', // 찜한 기사님
    INFO: '/customer/info/edit', // 고객 기본 정보 수정
    PROFILE: '/customer/profile', // 고객 프로필
    REVIEWS: {
      ROOT: '/customer/reviews',
      PENDING: '/customer/reviews/pending', // 작성 가능한 리뷰
      SUBMITTED: '/customer/reviews/submitted', // 내가 작성한 리뷰
    },
  },
  WORKER: {
    ROOT: '/worker', // 받은 요청
    DETAIL: (id: string) => `/worker/${id}`, // 기사님 상세
    ESTIMATES: {
      ROOT: '/worker/estimates',
      REJECTED: '/worker/estimates/rejected', // 내 견적 관리 - 반려 요청
      SENDING: '/worker/estimates/sending', // 내 견적 관리 - 보낸 견적 조회
    },
    INFO: '/worker/info/edit', // 기사님 기본 정보 수정
    PROFILE: '/worker/profile', // 기사님 프로필
  },
};

export default ROUTES;
