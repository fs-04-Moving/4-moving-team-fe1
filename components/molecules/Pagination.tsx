/**
 * @description
 * 페이지네이션 컴포넌트
 *
 * @example
 * const [currentPage, setCurrentPage] = useState(1);
 * const totalPages = 10;
 *
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={(page) => setCurrentPage(page)}
 *   className="mt-5 mb-3"
 * />
 *
 * @param {number} props.currentPage - 현재 페이지
 * @param {number} props.totalPages - 전체 페이지 수
 * @param {Function} props.onPageChange - 페이지 변경 시 호출되는 콜백 함수
 * @param {string} props.className - 추가 CSS 클래스
 * - 간격등이나 넓이등 위에 예시처럼 페이지상에서 조절이 필요한부분 tailwind로 넣어주면됩니다
 * - 최상위 div 입니다
 *
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // 초기 체크
    checkScreenSize();
    //리사이즈
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const pageNumbers = useMemo(() => {
    // sm, md 화면에서는 3개, lg 화면에서는 5개 표시
    const visibleCount = isLargeScreen ? 5 : 3;

    //보여지는 페이지 번호 계산
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

  // 특정 클릭 페이지로 이동
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
      {/* 맨 앞 페이지 버튼 */}
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

      {/* 일반 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          page={page}
          isActive={currentPage === page}
          onClick={() => handlePageClick(page)}
        />
      ))}

      {/* 제일 마지막 페이지 버튼 */}
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
