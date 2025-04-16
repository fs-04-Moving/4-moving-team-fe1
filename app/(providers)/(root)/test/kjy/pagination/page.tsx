'use client';

import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100; // 총 페이지 수

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-8'>페이지네이션 컴포넌트 테스트</h1>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Page;
