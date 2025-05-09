import axios from 'axios';
import { API_URL } from '@/constants/env';

type Estimate = {
  id: string;
  serviceType: string;
  status: string;
  customerName: string;
  movingDate: string;
  departure: string;
  destination: string;
  isConfirmed: boolean;
  requestDate: string;
};

type RejectEstimatesResponse = {
  list: Estimate[];
  totalCount: number;
};

export async function getRejectedEstimatesSSR(
  page: number,
  pageSize: number,
  accessToken: string,
): Promise<RejectEstimatesResponse> {
  const res = await axios.get(`${API_URL}/estimate/reject`, {
    params: { page, pageSize },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return res.data;
}
