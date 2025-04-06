/**
 * 페이지네이션 컴포넌트
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지 수
 * @param onPageChange 페이지 변경 시 호출되는 콜백 함수
 * @param className 추가 CSS 클래스
 */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import PaginationArrowButton from '../atoms/PaginationArrowButton';
import PaginationButton from '../atoms/PaginationButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  // 반응형을 위한 화면 크기 상태
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 페이지 번호 배열 생성 로직
  const pageNumbers = useMemo(() => {
    // sm, md 화면에서는 3개, lg 화면에서는 5개 표시
    const visibleCount = isLargeScreen ? 5 : 3;

    // 표시할 페이지 번호 계산
    let startPage = 1;

    // sm, md 화면에서는 2페이지부터, lg 화면에서는 4페이지부터 이동 시작
    const moveStartThreshold = isLargeScreen ? 4 : 2;

    if (currentPage >= moveStartThreshold) {
      // 현재 페이지가 마지막 페이지에 가까울 때 조정
      if (currentPage > totalPages - Math.floor(visibleCount / 2)) {
        startPage = Math.max(1, totalPages - visibleCount + 1);
      } else {
        // 현재 페이지 기준으로 가운데로 표시하기
        startPage =
          currentPage - Math.floor(visibleCount / 2) + (isLargeScreen ? 0 : 1);
      }
    }

    // 최대 표시 페이지 계산
    const endPage = Math.min(totalPages, startPage + visibleCount - 1);

    // 시작 페이지 재조정 혹시 필요한경우에
    // startPage = Math.max(1, endPage - visibleCount + 1);

    // 페이지 번호 배열 생성
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages, isLargeScreen]);

  // 이전 페이지로 이동
  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  // 다음 페이지로 이동
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  // 특정 페이지로 이동
  const handlePageClick = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {/* 이전 페이지 버튼 */}
      <PaginationArrowButton
        direction='left'
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />

      {/* 첫 페이지 버튼 */}
      {!pageNumbers.includes(1) && (
        <>
          <PaginationButton
            page={1}
            isActive={currentPage === 1}
            onClick={() => handlePageClick(1)}
          />
          {pageNumbers[0] > 2 && (
            <span className='text-GrayScale-400'>...</span>
          )}
        </>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          page={page}
          isActive={currentPage === page}
          onClick={() => handlePageClick(page)}
        />
      ))}

      {/* 마지막 페이지 버튼 */}
      {!pageNumbers.includes(totalPages) && totalPages > 1 && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className='text-GrayScale-400'>...</span>
          )}
          <PaginationButton
            page={totalPages}
            isActive={currentPage === totalPages}
            onClick={() => handlePageClick(totalPages)}
          />
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <PaginationArrowButton
        direction='right'
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}

export default Pagination;
