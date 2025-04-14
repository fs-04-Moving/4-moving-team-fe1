const exampleReviewData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    serviceType: ['smallMove', 'homeMove', 'officeMove', 'storageMove'][index % 4],
    workerProfileImage: '/assets/images/avatartion-1.svg',
    workerNickname: `기사${index + 1}`,
    movingDate: new Date(2024, 6, (index % 30) + 1),
    price: 100000 + index * 5000,
    isReviewWritten: false,
  }));
  
  export default exampleReviewData;