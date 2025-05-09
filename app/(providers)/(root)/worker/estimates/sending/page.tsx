'use client';

import { getSentEstimates } from '@/api/estimate/workerOnly/estimate.api';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';
import { Estimate } from '@/types/entities/estimate.entity';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function SendingEstimatesPage() {
  const router = useRouter();

  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const safeDate = (date: Date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  useEffect(() => {
    async function fetchEstimates() {
      try {
        const { list, totalCount } = await getSentEstimates({
          page: 1,
          pageSize: 10,
        });
        setEstimates(list);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Failed to fetch estimates:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEstimates();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (totalCount === 0) {
    return <div className="text-center mt-12 text-gray-500">보낸 견적이 없습니다.</div>;
  }

  return (
    <div
      className="
        mx-auto
        mt-12
        w-[327px] md:w-[600px] lg:w-[1400px]
        grid grid-cols-1 lg:grid-cols-2 gap-4
      "
    >
      <ul>
        {estimates.map((estimate) => (
          <CustomerCardInEstimate
            id={estimate.id}
            key={estimate.id}
            serviceType={estimate.serviceType}
            status={estimate.status}
            customerName={estimate.customerName}
            movingDate={new Date(estimate.movingDate)}
            departure={estimate.departure}
            destination={estimate.destination}
            isConfirmed={estimate.isConfirmed}
            requestDate={safeDate(estimate.requestDate)}
            price={estimate.price}
            onViewDetail={() => {
              router.push(`/worker/estimates/sending/${estimate.id}`);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default SendingEstimatesPage;
