"use client";

import { useEffect, useState } from "react";
import CustomerCardInEstimate from "@/components/organisms/CustomerCardInEstimate";
import Pagination from "@/components/molecules/Pagination";

import ProtectedPageWrapper from "@/components/atoms/ProtectedPageWrapper";
import { Estimate } from "@/types/entities/estimate.entity";
import { getRejectedEstimates } from "@/api/estimate/workerOnly/estimate.api";

function RejectedEstimatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // -> Pagination 숫자 안정해서 추후 요녀석 수정
  const [fetchedCards, setFetchedCards] = useState<Estimate[]>([]);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentCards = mockCards.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(mockCards.length / itemsPerPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { list, totalCount } = await getRejectedEstimates({
          page: currentPage,
          pageSize: itemsPerPage,
        });
        setFetchedCards(list);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch rejected estimates", error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:gap-[48px] items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
          {fetchedCards.length === 0 ? (
            <div className="text-gray-500 text-center mt-8">
              거절된 견적이 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
              {fetchedCards.map((card, index) => (
                <div
                  key={index}
                  className="w-[328px] h-[192px] md:w-[600px] md:h-[164px] lg:w-[688px] lg:h-[216px]"
                >
                  <CustomerCardInEstimate {...card} />
                </div>
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          className="mt-2"
        />
      </div>
    </ProtectedPageWrapper>
  );
}

export default RejectedEstimatesPage;
