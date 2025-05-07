'use client';

import { getEstimateDetailByWorker } from '@/api/estimate/workerOnly/estimate.api';
import { Estimate } from '@/types/entities/estimate.entity';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EstimatesDetailPage() {
  const params = useParams();
  const id = params.id as string;
  // const router = useRouter();

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEstimate = async () => {
      setLoading(true);
      const data = await getEstimateDetailByWorker(id);
      if (data) {
        setEstimate(data);
      }
      setLoading(false);
    };

    fetchEstimate();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!estimate) return <div>견적 정보를 불러오지 못했습니다.</div>;

  return <div></div>;
}
