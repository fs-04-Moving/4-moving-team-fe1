'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DriverCardInWritableReview from '@/components/organisms/DriverCardInWritableReview';
import exampleReviewData from './exampleReviewData'; 
import type { Metadata } from 'next';



function PendingReviewsPage() {
  const [reviewData, setReviewData] = useState(exampleReviewData); // 초기 상태를 예시 데이터로 설정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setLoading(true);
      axios
        .get('/api/reviews/writable', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setReviewData(response.data); // API 응답 데이터로 상태 업데이트
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      // 토큰이 없으면 예시 데이터 사용 (이미 초기 상태로 설정됨)
    }
  }, []);

  const handleWriteReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = (reviewData) => {
    // 리뷰 작성 API 호출 및 처리 하는곳곳

    setIsModalOpen(false);
    // 리뷰 목록 다시 불러오기 (선택 사항)
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewData.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Pagination = ({ reviewsPerPage, totalReviews, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="flex justify-center mt-4">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded ${
                  currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="bg-GrayScale-500 flex flex-col">
      <div className="flex flex-wrap">
        {currentReviews.length === 0 ? (
          <div>리뷰가 없습니다.</div>
        ) : (
          currentReviews.map((review) => (
            <div key={review.id} className="w-1/2 p-2">
              <DriverCardInWritableReview
                serviceType={review.serviceType}
                workerProfileImage={review.workerProfileImage}
                workerNickname={review.workerNickname}
                movingDate={new Date(review.movingDate)}
                price={review.price}
                isReviewWritten={review.isReviewWritten}
                onClickWriteReview={() => handleWriteReview(review.id)}
              />
            </div>
          ))
        )}
      </div>
      <Pagination
        reviewsPerPage={reviewsPerPage}
        totalReviews={reviewData.length}
        paginate={paginate}
      />
      {isModalOpen && (
        <ReviewModal
          reviewId={selectedReviewId}
          onSubmit={handleReviewSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default PendingReviewsPage;