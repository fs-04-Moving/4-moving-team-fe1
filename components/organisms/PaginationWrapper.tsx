'use client';

import Pagination from '@/components/molecules/Pagination';

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function PaginationWrapper({
  currentPage,
  totalPages,
  className,
}: PaginationWrapperProps) {
  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    window.location.href = url.toString();
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      className={className}
    />
  );
}
