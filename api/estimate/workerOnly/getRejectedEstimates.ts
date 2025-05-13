import axios from 'axios';

export type Estimate = {
  serviceType: string;
  status: string;
  customerName: string;
  movingDate: string;
  departure: string;
  destination: string;
  isConfirmed: boolean;
  requestDate: string;
  price: number;
  id: string;
};

export type RejectedEstimatesResponse = {
  list: Estimate[];
  totalCount: number;
};

export const getRejectedEstimatesServer = async (
  page: number,
  pageSize: number,
  accessToken: string,
): Promise<RejectedEstimatesResponse> => {
  const res = await axios.get(`${process.env.API_URL}/estimate/reject`, {
    params: { page, pageSize },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};
